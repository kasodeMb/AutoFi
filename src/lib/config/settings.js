export const CSV_LAYOUTS = {
  providerA: [
    'uuid',
    'vin',
    'make',
    'model',
    'mileage',
    'year',
    'price',
    'zip_code',
    'create_date',
    'update_date',
  ],
  providerB: [
    'uuid',
    'vin',
    'model',
    'mileage',
    'year',
    'price',
    'create_date',
    'update_date',
  ],
  providerC: [
    'uuid',
    'vin',
    'extra_field',
    'mileage',
    'year',
    'price',
    'zip_code',
  ],
}

export const DEFAULT_CSV_LAYOUT = {
  uuid: String,
  vin: String,
  make: String,
  model: String,
  mileage: Number,
  year: Number,
  price: Number,
  zip_code: Number,
  create_date: Date,
  update_date: Date,
}
