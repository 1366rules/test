const warScoreData = {
    "2025-03-31": [{
            rank: 1,
            name: "Esequibo",
            alliance: "MOO",
            positive: 2607216212,
            negative: 1596397824,
            balance: 1010818388
        },
        {
            rank: 2,
            name: "Dreamcry",
            alliance: "SCC",
            positive: 2331918676,
            negative: 986831232,
            balance: 1345087444
        },
        {
            rank: 3,
            name: "Δπdr€W",
            alliance: "SCC",
            positive: 2182885937,
            negative: 161587120,
            balance: 2021298817
        },
        {
            rank: 4,
            name: "Jason123",
            alliance: "SCC",
            positive: 1404926993,
            negative: 2683859968,
            balance: -1278932975
        },
        {
            rank: 5,
            name: "Guaye",
            alliance: "PTO",
            positive: 1363926582,
            negative: 1979449088,
            balance: -615522506
        }
    ]
};
// Fungsi untuk mengkonversi data ke format CSV
function convertToCSV(data) {
    const headers = ["Rank", "Player Name", "Alliance", "Positive Score", "Negative Score", "Balance"];
    const rows = data.map(item => [
        item.rank,
        `"${item.name}"`, // Tambahkan quotes untuk handle koma dalam nama
        `"${item.alliance}"`,
        item.positive,
        item.negative,
        item.balance
    ]);
    return [headers.join(","), ...rows.map(row => row.join(","))].join("\n");
}
// Fungsi untuk memicu download CSV
function downloadCSV() {
    const currentData = warScoreData[availableDates[currentDateIndex]] || [];
    if (currentData.length === 0) {
        alert("No data available to download");
        return;
    }
    const csvContent = convertToCSV(currentData);
    const blob = new Blob([csvContent], {
        type: "text/csv;charset=utf-8;"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `war_scores_${availableDates[currentDateIndex]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
// Fungsi untuk memicu download Excel (dummy - butuh SheetJS untuk implementasi nyata)
function downloadExcel() {
    alert("Untuk download Excel, Anda perlu mengimplementasikan SheetJS library");
    // Implementasi nyata akan memerlukan library xlsx.js
    // Contoh:
    // const wb = XLSX.utils.book_new();
    // const ws = XLSX.utils.json_to_sheet(currentData);
    // XLSX.utils.book_append_sheet(wb, ws, "War Scores");
    // XLSX.writeFile(wb, `war_scores_${availableDates[currentDateIndex]}.xlsx`);
}
// Event listeners untuk tombol download
document.addEventListener('DOMContentLoaded', function() {
    // ... kode sebelumnya ...
    document.getElementById('download-csv').addEventListener('click', (e) => {
        e.preventDefault();
        downloadCSV();
    });
    document.getElementById('download-excel').addEventListener('click', (e) => {
        e.preventDefault();
        downloadExcel();
    });
});
// Fungsi untuk download Excel
function downloadExcel() {
    const currentDate = availableDates[currentDateIndex];
    const data = warScoreData[currentDate] || [];
    if (data.length === 0) {
        alert("No data available to download");
        return;
    }
    // Format data untuk Excel
    const excelData = data.map(item => ({
        "Rank": item.rank,
        "Player Name": item.name,
        "Alliance": item.alliance,
        "Positive Score": item.positive,
        "Negative Score": item.negative,
        "Balance": item.balance
    }));
    // Buat worksheet
    const ws = XLSX.utils.json_to_sheet(excelData);
    // Buat workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "War Scores");
    // Export ke file
    XLSX.writeFile(wb, `war_scores_${currentDate}.xlsx`);
}
// Event listener untuk tombol download Excel
document.getElementById('download-excel').addEventListener('click', (e) => {
    e.preventDefault();
    downloadExcel();
});