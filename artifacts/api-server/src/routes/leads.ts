import { Router } from "express";
import { ReplitConnectors } from "@replit/connectors-sdk";

const router = Router();

const SPREADSHEET_ID = process.env["GOOGLE_SHEET_ID"];

router.post("/leads", async (req, res) => {
  const { nama, telefon, emel, lokasi, pendapatan, status, cara, catatan } = req.body;

  if (!nama || !telefon || !emel) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  if (!SPREADSHEET_ID) {
    req.log.error("GOOGLE_SHEET_ID environment variable is not set");
    res.status(500).json({ error: "Server configuration error" });
    return;
  }

  try {
    const connectors = new ReplitConnectors();

    const timestamp = new Date().toLocaleString("ms-MY", {
      timeZone: "Asia/Kuala_Lumpur",
      dateStyle: "short",
      timeStyle: "short",
    });

    const pendapatanLabel: Record<string, string> = {
      "<3000": "Bawah RM3,000",
      "3000-5000": "RM3,000 – RM5,000",
      "5000-7000": "RM5,000 – RM7,000",
      ">7000": "Lebih RM7,000",
    };
    const statusLabel: Record<string, string> = {
      pertama: "Pembeli Pertama",
      ada: "Sudah Ada Rumah",
      lain: "Lain-lain",
    };
    const caraLabel: Record<string, string> = {
      whatsapp: "WhatsApp",
      telefon: "Panggilan Telefon",
      emel: "E-mel",
    };

    const row = [
      timestamp,
      nama,
      telefon,
      emel,
      lokasi ?? "",
      pendapatanLabel[pendapatan] ?? pendapatan ?? "",
      statusLabel[status] ?? status ?? "",
      caraLabel[cara] ?? cara ?? "",
      catatan ?? "",
    ];

    const response = await connectors.proxy(
      "google-sheet",
      `/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1!A1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ values: [row] }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      req.log.error({ status: response.status, body: errorText }, "Google Sheets API error");
      res.status(502).json({ error: "Failed to save to Google Sheets" });
      return;
    }

    req.log.info({ nama, telefon }, "Lead saved to Google Sheets");
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Error saving lead");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
