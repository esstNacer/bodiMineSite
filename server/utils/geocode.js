// 📁 src/utils/geocode.js
import axios from "axios";

/**
 * Effectue un géocodage à partir d'une adresse complète (adresse + ville + pays)
 * en utilisant l'API Nominatim (OpenStreetMap).
 * 
 * @param {string} address - L’adresse complète à géocoder.
 * @returns {Promise<{ latitude: number, longitude: number } | null>}
 */
export default async function geocodeAddress(address) {
  try {
    const response = await axios.get("https://nominatim.openstreetmap.org/search", {
      params: {
        q: address,
        format: "json",
        limit: 1,
      },
      headers: {
        "User-Agent": "BodyMineApp/1.0 (contact@bodymine.com)", // Bonnes pratiques
      },
    });

    if (!response.data || response.data.length === 0) {
      console.warn("Adresse introuvable :", address);
      return null;
    }

    const { lat, lon } = response.data[0];
    return {
      latitude: parseFloat(lat),
      longitude: parseFloat(lon),
    };
  } catch (error) {
    console.error("Erreur lors du géocodage :", error.message);
    return null;
  }
}
