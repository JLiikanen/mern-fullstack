
async function query(data) {
    const response = await fetch(
    "https://api.stack-ai.com/inference/v0/run/7ef2ce8a-ad2d-4a02-bf15-cffeeed28769/666d90431bb3c737e52d9216",
    {
        headers: {'Authorization':
           'Bearer 6c9dda1a-7ecc-4a72-8f0b-af003bc096d4',
           'Content-Type': 'application/json'
      },
        method: "POST",
        body: JSON.stringify(data),
    }
    );
    const result = await response.json();
    return result;
}

/*
query({"user_id": `<USER or Conversation ID>`, "in-0": `Shortly explain to me what aalto bt is?`}).then((response) => {
    console.log(JSON.stringify(response));
});
*/

query({ "user_id": "<USER or Conversation ID>", "in-0": "Shortly explain to me what aalto bt is?" })
    .then((output) => {
        // Access the response string from the output
        const responseString = output.outputs["out-0"];

        // Check if the response string is defined
        if (typeof responseString === 'string') {
            // Extract the main response (before any citations)
            const response = responseString.split("<citations>")[0].trim();

            // Extract the citations part
            const citationsStartIndex = responseString.indexOf("<citations>");
            const citationsEndIndex = responseString.indexOf("</citations>");
            const citations = citationsStartIndex !== -1 && citationsEndIndex !== -1
                ? responseString.slice(citationsStartIndex + "<citations>".length, citationsEndIndex).trim()
                : '';

            // Extract URLs containing "supabase"
            const urlRegex = /https?:\/\/[^\s]*supabase[^\s]*/g; // Regular expression to match URLs containing "supabase"
            const supabaseUrls = citations.match(urlRegex) || []; // Extract URLs or return an empty array if none found

            // Log the response and URLs
            console.log("Response:", response);
            console.log("Supabase URLs:", supabaseUrls);

            // Optionally return or store the response and URLs as needed
            return { response, supabaseUrls };
        } else {
            console.error('"out-0" is either undefined or not a string');
        }
    })
    .catch((error) => {
        // Handle errors, if any
        console.error("Error:", error);
    });
