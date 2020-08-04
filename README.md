# AutoFi
AutoFi - Coding Challenge

## Scenario
You work on a product that receives potentially large files in CSV format, process them and
import their data into our database. However, providers do not all use the same layout of
columns. The order may differ between providers, they may only send a subset of the columns,
or they may include additional columns we do not wish to capture.

## Task
Build an API with a single endpoint that accepts a file upload in the CSV format and the provider
name that sent the file, looks up a configuration defining the column layout and parses the CSV
into either a file or - as a stretch goal - into an in-memory database (see below).
The columns we care about are defined below in the “Columns” section.

## Columns
● UUID
● VIN (alphanumerical vehicle id)
● Make
● Model
● Mileage
● Year
● Price
● Zip Code
● Create Date
● Update Date

## Code Assumptions

- There are only 3 valid providers: providerA (has all columns), providerB (has less columns) and providerC (has less columns but one extra that is not expected and the code will ignore)
- The csv will follow the columns layout of the provider included in the request
- If there any error with the csv file (wrong format, invalid column type), nothing will be saved in the data base