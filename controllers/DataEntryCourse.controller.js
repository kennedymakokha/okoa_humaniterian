import expressAsyncHandler from "express-async-handler"
import multer from 'multer';
import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export function compareData(original, newData) {
    const discrepancies = [];

    const maxLength = Math.max(original.length, newData.length); // Find the maximum length

    for (let i = 0; i < maxLength; i++) {
        const originalEntry = original[i];
        const newEntry = newData[i];

        // Check if entries exist
        if (originalEntry && newEntry) {
            for (const key in originalEntry) {
                if (originalEntry[key] !== newEntry[key]) {
                    discrepancies.push({
                        index: i,
                        property: key,
                        original: originalEntry[key],
                        new: newEntry[key]
                    });
                }
            }
        } else {
            discrepancies.push({
                index: i,
                property: 'Entry Missing',
                original: originalEntry || 'undefined',
                new: newEntry || 'undefined'
            });
        }
    }

    return discrepancies;
}



export const Upload_task = expressAsyncHandler(async (req, res) => {
    try {
        const results = [];
        const OriginalData = [];
        const filePath = path.join(__dirname, '../uploads', req.file.filename); // Use the filename from multer

        fs.createReadStream('./data_20.csv')
            .pipe(csv())
            .on('data', (data) => OriginalData.push(data))
            .on('end', () => {
                // console.log(OriginalData);
            });
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                // Delete the uploaded file after reading
                fs.unlinkSync(filePath);
                const Speed = results.length / 60
                const discrepancies = compareData(OriginalData, results);
                let Errors = []
                const Acuracy = (1 - discrepancies.length / OriginalData.length) * 100
                // results.length / 60
                if (discrepancies.length > 0) {
                    // console.log("Discrepancies found:");

                    discrepancies.forEach((discrepancy) => {

                        const getValue = (str) => {
                            const Label = str.split(":")[0].trim();
                            const string = str.split("'")[1]
                            const match = str.match(/'(\d+)'/); // Matches the digits inside single quotes
                            const ageNumber = match ? Number(match[1]) : null;
                            return { label: Label, value: ageNumber, string: string }
                        }
                        Errors.push(
                            {
                                // expected: discrepancy.original, got: discrepancy.new,
                                expected: getValue(discrepancy.original).value === null ? getValue(discrepancy.original).string : getValue(discrepancy.original).value,
                                got: getValue(discrepancy.new).value === null ? getValue(discrepancy.new).string : getValue(discrepancy.new).value,
                                label: getValue(discrepancy.new).label
                            });
                    });
                } else {
                    console.log("No discrepancies found.");
                }

                return res.status(200).json({ speed: Speed, acuracy: Acuracy, records: results.length, errors: Errors });
            })
            .on('error', (error) => {
                res.status(500).send('Error reading CSV file');
                // });
            });


    } catch (error) {
        console.log(error)
    }
})
export const Upload_test = expressAsyncHandler(async (req, res) => {
    try {
        const results = [];
        const OriginalData = [];
        const filePath = path.join(__dirname, '../uploads', req.file.filename); // Use the filename from multer



    } catch (error) {
        console.log(error)
    }
})








