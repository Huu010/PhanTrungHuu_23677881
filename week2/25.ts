function downloadFile(fileName: string): Promise<void> {
  return new Promise<void>((resolve) => {
    console.log(`Downloading ${fileName}...`);

    setTimeout(() => {
      console.log(`${fileName} downloaded successfully.`);
      resolve();
    }, 3000);
  });
}

downloadFile("report.pdf").catch(console.error);
