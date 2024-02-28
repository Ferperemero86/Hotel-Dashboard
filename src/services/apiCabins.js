import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(
    import.meta.env.VITE_SUPABASE_URL
  );
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${
        import.meta.env.VITE_SUPABASE_URL
      }/storage/v1/object/public/cabin-images/${imageName}`;

  delete newCabin.file;

  //1. Create/edit cabin
  let query = supabase.from("cabins");

  // A) Create
  if (!id) {
    const { data: existentCabin } = await supabase
      .from("cabins")
      .select("*")
      .eq("name", newCabin.name);

    if (existentCabin.length > 0) {
      throw new Error("Cabin name already exsists");
    }

    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  // B) Edit
  if (id) {
    const { data: existentCabin } = await supabase
      .from("cabins")
      .select("*")
      .eq("name", newCabin.name)
      .neq("id", id);

    if (existentCabin.length > 0) {
      throw new Error("Cabin name already exsists");
    }
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be created");
  }

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
