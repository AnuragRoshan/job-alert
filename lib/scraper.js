// / 📁 lib/scraper.js
import puppeteer from "puppeteer";
import cheerio from "cheerio";
import crypto from "crypto";

const generateJobHash = (title, company, url) => {
  return crypto
    .createHash("md5")
    .update(`${title}-${company}-${url}`)
    .digest("hex");
};

// Generic scraper that works with most career pages
export const scrapeJobs = async (url, company, keywords = []) => {
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    );

    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });

    // Wait for job listings to load
    await page.waitForSelector(
      'a[href*="job"], a[href*="career"], a[href*="position"], .job, .position, .role',
      { timeout: 10000 }
    );

    const content = await page.content();
    const $ = cheerio.load(content);

    const jobs = [];

    // Common selectors for job listings
    const jobSelectors = [
      'a[href*="job"]',
      'a[href*="career"]',
      'a[href*="position"]',
      ".job-listing a",
      ".position a",
      ".role a",
      "[data-job-id] a",
      ".job-title a",
    ];

    for (const selector of jobSelectors) {
      $(selector).each((index, element) => {
        const $element = $(element);
        const title = $element.text().trim() || $element.attr("title") || "";
        const jobUrl = $element.attr("href") || "";

        if (title && jobUrl && title.length > 5) {
          // Make URL absolute if relative
          const fullUrl = jobUrl.startsWith("http")
            ? jobUrl
            : new URL(jobUrl, url).href;

          // Extract location (look for common patterns)
          const locationText = $element.closest("div, li, tr").find("*").text();
          const locationMatch = locationText.match(
            /([A-Z][a-z]+,?\s*[A-Z]{2,})|Remote|Hybrid/i
          );
          const location = locationMatch ? locationMatch[0] : "";

          const job = {
            title: title.replace(/\s+/g, " ").trim(),
            company,
            location,
            url: fullUrl,
            posted: new Date(),
            hash: generateJobHash(title, company, fullUrl),
          };

          // Filter by keywords if provided
          if (
            keywords.length === 0 ||
            keywords.some((keyword) =>
              title.toLowerCase().includes(keyword.toLowerCase())
            )
          ) {
            jobs.push(job);
          }
        }
      });

      if (jobs.length > 0) break; // Found jobs with this selector
    }

    return jobs.slice(0, 50); // Limit to 50 jobs per check
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    return [];
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

// Company-specific scrapers for better accuracy
export const customScrapers = {
  "google.com": async (url, company, keywords) => {
    // Custom Google careers scraper
    return scrapeJobs(url, company, keywords);
  },

  "microsoft.com": async (url, company, keywords) => {
    // Custom Microsoft careers scraper
    return scrapeJobs(url, company, keywords);
  },

  "apple.com": async (url, company, keywords) => {
    // Custom Apple careers scraper
    return scrapeJobs(url, company, keywords);
  },
};

export const getJobsForAlert = async (alert) => {
  const domain = new URL(alert.website).hostname;
  const scraper = customScrapers[domain] || scrapeJobs;

  return await scraper(alert.website, alert.company, alert.keywords);
};
