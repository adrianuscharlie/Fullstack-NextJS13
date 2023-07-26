import { connectToDB } from "@utils/database";
import Sambat from "@model/sambat";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const sambat = await Sambat.findById(params.id).populate("creator");
    if (!sambat) return new Response("Sambat not found", { status: 404 });
    return new Response(JSON.stringify(sambat, { status: 200 }));
  } catch (error) {
    return new Response("Failed to fetch sambat", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { sambat, tag } = await request.json();
  try {
    await connectToDB();
    const existingSambat = await Sambat.findById(params.id);
    if (!existingSambat) return new Response("Sambat not found");
    existingSambat.sambat = sambat;
    existingSambat.tag = tag;
    await existingSambat.save();
    return new Response(JSON.stringify(existingSambat), { status: 200 });
  } catch (error) {
    return new Response("Failed to update Sambat", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Find the prompt by ID and remove it
    await Sambat.findByIdAndRemove(params.id);

    return new Response("Sambat deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting sambat", { status: 500 });
  }
};
