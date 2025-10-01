const fs = require('fs');

function convertJsonToCsv(jsonFilePath, csvFilePath) {
  try {
    // Read and parse JSON file
    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

    if (!jsonData.rows || !Array.isArray(jsonData.rows)) {
      throw new Error('Invalid JSON structure: missing rows array');
    }

    const rows = jsonData.rows;

    if (rows.length === 0) {
      console.log('No data to convert');
      return;
    }

    // Get all possible headers by examining the first row and template_params
    const sampleRow = rows[0];
    const templateParams = JSON.parse(sampleRow.template_params);

    // Define all headers
    const headers = [
      'id',
      'result',
      'error',
      'provider',
      'service_id',
      'original_service_id',
      'template_id',
      'files',
      'retry_count',
      'send_time',
      'created_at',
      'updated_at',
      // Template params fields
      'user_os',
      'user_platform',
      'user_browser',
      'user_version',
      'user_country',
      'user_ip',
      'user_referrer',
      'firstName',
      'lastName',
      'email',
      'phone',
      'purpose',
      'comments',
      'source_site',
      'source_url',
      'title',
      'name'
    ];

    // Convert rows to CSV data
    const csvRows = rows.map(row => {
      let templateParams = {};
      try {
        templateParams = JSON.parse(row.template_params);
      } catch (e) {
        console.warn(`Failed to parse template_params for row ${row.id}:`, e.message);
      }

      return headers.map(header => {
        let value;

        // Handle nested template_params fields
        if (['user_os', 'user_platform', 'user_browser', 'user_version', 'user_country', 'user_ip', 'user_referrer', 'firstName', 'lastName', 'email', 'phone', 'purpose', 'comments', 'source_site', 'source_url', 'title', 'name'].includes(header)) {
          value = templateParams[header] || '';
        } else {
          value = row[header] || '';
        }

        // Escape quotes and wrap in quotes if contains comma, quote, or newline
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          value = '"' + value.replace(/"/g, '""') + '"';
        }

        return value;
      });
    });

    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...csvRows.map(row => row.join(','))
    ].join('\n');

    // Write to CSV file
    fs.writeFileSync(csvFilePath, csvContent, 'utf8');

    console.log(`Successfully converted ${rows.length} rows to ${csvFilePath}`);

  } catch (error) {
    console.error('Error converting JSON to CSV:', error.message);
    process.exit(1);
  }
}

// Usage
const inputFile = 'respinse.txt';
const outputFile = 'emails.csv';

convertJsonToCsv(inputFile, outputFile);
