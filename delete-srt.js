const fs = require("fs");
const path = require("path");

function deleteSrtFiles(folderPath) {
    if (!fs.existsSync(folderPath)) {
        console.log("Path does not exist.");
        return;
    }

    let deletedCount = 0;

    function walkDir(currentPath) {
        const files = fs.readdirSync(currentPath);

        files.forEach(file => {
            const filePath = path.join(currentPath, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                walkDir(filePath); // Recurse into subfolder
            } else if (file.toLowerCase().endsWith(".srt")) {
                try {
                    fs.unlinkSync(filePath);
                    console.log(`Deleted: ${filePath}`);
                    deletedCount++;
                } catch (err) {
                    console.log(`Error deleting ${filePath}:`, err.message);
                }
            }
        });
    }

    walkDir(folderPath);
    console.log(`\nDone. Total .srt files deleted: ${deletedCount}`);
}

// 👇 Replace with your folder path
const folderPath = "D:\Figma";
deleteSrtFiles(folderPath);
