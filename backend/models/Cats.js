const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const catSchema = new Schema(
    {
       name: String,
       temperament: String,
       life_span: String,
       wikipedia_url: String,
       origin: String,
       weight: String,
       hypoallergenic: Number,
       

    }
)