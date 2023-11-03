type IResponse = {
    statusCode: number | undefined;
    body: string;
};
import https from 'https';
const handler = async (): Promise<IResponse> => {
    const params = new URLSearchParams({
        lat: '45',
        lon: '8',
        slope: '35',
        azimuth: '14',
        outputformat: 'json',
    });
    const options = {
        method: 'GET',
        headers: {
            Cookie: 'TS01316d01=01f4fc03dd5b0548c6d96bc9dbf6fb5740681ada76fe9215aec1a5ef588367833ef3195882aaf9f9e1621c6bbfadd0b23a3c792214; jrc_cookie=!rEd8eJlyAn51S4/SUKTDyo2EIrthA1XrqA2sY37HS4cWsLSmRkPrHMBN1nZjI0M2DovDTSzSbH29DFg=',
        },
    };
    const apiUrl = `https://re.jrc.ec.europa.eu/api/PVcalc?${params}`;
    return new Promise((resolve, reject) => {
        const req = https.request(apiUrl, options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    body: data,
                });
            });
        });
        req.on('error', (error) => {
            reject({
                statusCode: 500,
                body: JSON.stringify({
                    message: 'Error fetching data from PVGIS API. Please try again.',
                    error: error.message,
                }),
            });
        });
        req.end();
    });
};

export default handler;

// }

// /**
//  * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
//  */
// exports.handler = async (event) => {
//     console.log(`EVENT: ${JSON.stringify(event)}`);
//     return {
//         statusCode: 200,
//     //  Uncomment below to enable CORS requests
//     //  headers: {
//     //      "Access-Control-Allow-Origin": "*",
//     //      "Access-Control-Allow-Headers": "*"
//     //  }
//         body: JSON.stringify('Hello from Lambda!')

//     };
// };
