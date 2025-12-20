import { ExamResult } from './storage';

// Replace this with your actual Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwhpfk-Nlppnb086Me3EZg5FN1oG7Rj_lou_gD0VM1Qf2fjPQPLQJUO2DZMeUI4H3hM/exec';

export const submitToGoogleSheet = async (data: ExamResult) => {


    try {
        // We use no-cors mode because Google Scripts don't support CORS headers for simple POSTs easily
        // This means we won't get a readable response, but the data will be sent.
        await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "text/plain",
            },
            body: JSON.stringify(data),
        });
        console.log('Submitted to Google Sheet');
    } catch (error) {
        console.error('Error submitting to Google Sheet:', error);
    }
};
