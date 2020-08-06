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
- UUID
- VIN (alphanumerical vehicle id)
- Make
- Model
- Mileage
- Year
- Price
- Zip Code
- Create Date
- Update Date

## Code Assumptions
- There are only 3 valid providers setup in the config file (provider_layouts.json): providerA (has all columns), providerB (has less columns) and providerC (has less columns but one extra that is not expected and the code will ignore)
- The csv will follow the columns layout of the provider included in the request
- If there is any error with the csv file (wrong format, invalid column type), nothing will be saved into the data base
- You can find an example CSV file for each provider in `tests/mocks/`

## Endpoints

### POST /vehicles
Params (multipart/form-data)
```
provider="ProviderA"
file="test/mocks/providerA.csv"
```
Example Result Sucess (Status Code 200)
```
{
    "message": "12 vehicles were successfuly saved."
}
```
Example Result Error (Status Code 400)
```
{
    "message": "Missing CSV File"
}
```

## Available Scripts
In the project directory, you can run:

### yarn serve
Runs the app in the development mode. The app will reload if you make edits.

### yarn test
Launches the test runner.

### yarn build
Builds the app for production.

## Known issues
When using `yarn serve` to run the app, a new mongo_db instance will be created every time a file changes due to live reload. As a workaround you can manually set the mongo_db uri of an existing instance running in the `.env.` file
```
MONGO_DB_URI=mongodb://127.0.0.1:61721/AutoFi-Dev?
```
