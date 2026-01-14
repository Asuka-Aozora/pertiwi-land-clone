import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectSchema() {
  console.log("Checking project_gallery...");
  const { data: gallery, error: galleryError } = await supabase
    .from("project_gallery")
    .select("*")
    .limit(1);
  if (galleryError) console.log("project_gallery error:", galleryError.message);
  else console.log("project_gallery:", gallery);

  console.log("Checking project_features...");
  const { data: features, error: featuresError } = await supabase
    .from("project_features")
    .select("*")
    .limit(1);
  if (featuresError)
    console.log("project_features error:", featuresError.message);
  else console.log("project_features:", features);

  console.log("Checking project_surroundings...");
  const { data: surroundings, error: surroundingsError } = await supabase
    .from("project_surroundings")
    .select("*")
    .limit(1);
  if (surroundingsError)
    console.log("project_surroundings error:", surroundingsError.message);
  else console.log("project_surroundings:", surroundings);

  console.log("Checking surroundings...");
  const { data: surroundings2, error: surroundingsError2 } = await supabase
    .from("surroundings")
    .select("*")
    .limit(1);
  if (surroundingsError2)
    console.log("surroundings error:", surroundingsError2.message);
  else console.log("surroundings:", surroundings2);

  console.log("Checking project_house_types...");
  const { data: houseTypes, error: houseTypesError } = await supabase
    .from("project_house_types")
    .select("*")
    .limit(1);
  if (houseTypesError)
    console.log("project_house_types error:", houseTypesError.message);
  else console.log("project_house_types:", houseTypes);

  console.log("Checking house_types...");
  const { data: houseTypes2, error: houseTypesError2 } = await supabase
    .from("house_types")
    .select("*")
    .limit(1);
  if (houseTypesError2)
    console.log("house_types error:", houseTypesError2.message);
  else console.log("house_types:", houseTypes2);

  console.log("Checking project_facilities...");
  const { data: facilities, error: facilitiesError } = await supabase
    .from("project_facilities")
    .select("*")
    .limit(1);
  if (facilitiesError)
    console.log("project_facilities error:", facilitiesError.message);
  else console.log("project_facilities:", facilities);
}

inspectSchema();
