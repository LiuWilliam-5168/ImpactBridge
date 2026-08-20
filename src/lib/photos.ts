import crackedEarthDrySeason from "@/assets/nicaragua/cracked-earth-dry-season.jpg";
import erodedHillside from "@/assets/nicaragua/eroded-hillside.jpg";
import livestockLossDrought from "@/assets/nicaragua/livestock-loss-drought.jpg";
import parchedFieldVolcano from "@/assets/nicaragua/parched-field-volcano.jpg";
import cattleOnBarePasture from "@/assets/nicaragua/cattle-on-bare-pasture.jpg";
import dryFarmlandCattle from "@/assets/nicaragua/dry-farmland-cattle.jpg";
import childCarryingWaterJug from "@/assets/nicaragua/child-carrying-water-jug.jpg";
import cleanWaterTap from "@/assets/nicaragua/clean-water-tap.jpg";
import drillingAWaterWell from "@/assets/nicaragua/drilling-a-water-well.jpg";
import communityAtReservoir from "@/assets/nicaragua/community-at-reservoir.jpg";
import fullRainwaterReservoir from "@/assets/nicaragua/full-rainwater-reservoir.jpg";
import waterHarvestingProjectSign from "@/assets/nicaragua/water-harvesting-project-sign.jpg";
import waterReachingTheCrops from "@/assets/nicaragua/water-reaching-the-crops.jpg";
import irrigationChannel from "@/assets/nicaragua/irrigation-channel.jpg";
import farmerAtReservoir from "@/assets/nicaragua/farmer-at-reservoir.jpg";
import fieldTeamRecordingData from "@/assets/nicaragua/field-team-recording-data.jpg";
import irrigatedCropRows from "@/assets/nicaragua/irrigated-crop-rows.jpg";
import managuaTreatmentPlant from "@/assets/nicaragua/managua-treatment-plant.jpg";

/**
 * Openly licensed photography of Nicaragua's water situation, for use across the
 * site. Every entry is CC BY, CC BY-SA, or public domain — see
 * src/assets/nicaragua/CREDITS.md for the full attribution list.
 *
 * `credit` must stay visible wherever a photo is shown: the CC licences require
 * attribution, and the CC BY-SA ones also require that adapted versions of the
 * image itself carry the same licence.
 */
export type PhotoTone = "challenge" | "progress";

export type Photo = {
  id: string;
  /** Bundled asset URL, ready to drop into an `<img src>`. */
  src: string;
  /** `challenge` shows the problem, `progress` shows the response to it. */
  tone: PhotoTone;
  /** Usable as both a caption and an `alt` description. */
  caption: string;
  credit: string;
  license: string;
  licenseUrl: string;
  /** Wikimedia Commons file page, for verifying the licence. */
  source: string;
};

export const photos: Photo[] = [
  {
    id: "cracked-earth-dry-season",
    src: crackedEarthDrySeason,
    tone: "challenge",
    caption: "Cracked earth during Nicaragua's intense dry season.",
    credit: "CIAT / Neil Palmer",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
    source: "https://commons.wikimedia.org/wiki/File:NP_Nicaragua2_lo_(5471480557).jpg",
  },
  {
    id: "eroded-hillside",
    src: erodedHillside,
    tone: "challenge",
    caption:
      "A bare, eroded hillside stripped of the cover that lets rainfall soak in rather than run off.",
    credit: "CIAT / Neil Palmer",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
    source: "https://commons.wikimedia.org/wiki/File:NP_Nicaragua3_lo_(5471233599).jpg",
  },
  {
    id: "livestock-loss-drought",
    src: livestockLossDrought,
    tone: "challenge",
    caption:
      "The carcass of a cow left after Nicaragua's dry season — livestock losses follow water losses.",
    credit: "CIAT / Neil Palmer",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
    source: "https://commons.wikimedia.org/wiki/File:NP_Nicaragua37_lo_(5472078328).jpg",
  },
  {
    id: "parched-field-volcano",
    src: parchedFieldVolcano,
    tone: "challenge",
    caption: "A parched field in the dry season, with the volcanic cordillera behind it.",
    credit: "CIAT / Neil Palmer",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
    source: "https://commons.wikimedia.org/wiki/File:NP_Nicaragua35_lo_(5471248619).jpg",
  },
  {
    id: "cattle-on-bare-pasture",
    src: cattleOnBarePasture,
    tone: "challenge",
    caption: "Cattle graze bare, dust-dry pasture at the height of the dry season.",
    credit: "CIAT / Neil Palmer",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
    source: "https://commons.wikimedia.org/wiki/File:Cattle_in_dry_season,_Nicaragua.jpg",
  },
  {
    id: "dry-farmland-cattle",
    src: dryFarmlandCattle,
    tone: "challenge",
    caption: "Dry season farmland with no standing water left for people or animals.",
    credit: "CIAT / Neil Palmer",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
    source: "https://commons.wikimedia.org/wiki/File:NP_Nicaragua43_lo_(5471253535).jpg",
  },
  {
    id: "child-carrying-water-jug",
    src: childCarryingWaterJug,
    tone: "challenge",
    caption:
      "A girl in León with a plastic water jug — carrying household water is often a child's job.",
    credit: "Adam Jones",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
    source:
      "https://commons.wikimedia.org/wiki/File:Girl_with_Water_Jug_-_Leon_-_Nicaragua_(31439869902).jpg",
  },
  {
    id: "clean-water-tap",
    src: cleanWaterTap,
    tone: "progress",
    caption: "A community drinking-water tap and basin in El Jicaral.",
    credit: "Martin Kulldorff",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    source: "https://commons.wikimedia.org/wiki/File:El_Jicaral_Fuente_de_agua_potable.jpg",
  },
  {
    id: "drilling-a-water-well",
    src: drillingAWaterWell,
    tone: "progress",
    caption: "A borehole rig drilling a new water well in the village of Samaria.",
    credit: "U.S. Army photo by 2nd Lt. Robert Lee",
    license: "Public domain",
    licenseUrl: "https://en.wikipedia.org/wiki/Copyright_status_of_works_by_the_U.S._government",
    source:
      "https://commons.wikimedia.org/wiki/File:US_Navy_100322-A-6032L-001_Seabees_assigned_to_Naval_Mobile_Construction_Battalion_(NMCB)_25,_based_at_Ft._McCroy,_Wis.,_drill_a_water_well_in_Samaria,_Nicaragua_as_part_of_Beyond_the_Horizon_2010.jpg",
  },
  {
    id: "community-at-reservoir",
    src: communityAtReservoir,
    tone: "progress",
    caption: "A community gathers at a new rainwater-harvesting reservoir.",
    credit: "CIAT / Neil Palmer",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
    source: "https://commons.wikimedia.org/wiki/File:NP_Nicaragua78_lo_(5471270791).jpg",
  },
  {
    id: "full-rainwater-reservoir",
    src: fullRainwaterReservoir,
    tone: "progress",
    caption: "A harvesting reservoir holding rainwater captured during the wet season.",
    credit: "CIAT / Neil Palmer",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
    source: "https://commons.wikimedia.org/wiki/File:NP_Nicaragua1_lo_(5471478879).jpg",
  },
  {
    id: "water-harvesting-project-sign",
    src: waterHarvestingProjectSign,
    tone: "progress",
    caption: "“Cosechando el Agua” — a rainwater-harvesting pilot site in Jalapa, Nueva Segovia.",
    credit: "CIAT / Neil Palmer",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
    source: "https://commons.wikimedia.org/wiki/File:NP_Nicaragua15_lo_(5471832666).jpg",
  },
  {
    id: "water-reaching-the-crops",
    src: waterReachingTheCrops,
    tone: "progress",
    caption: "Stored water reaches the fields — dry-season irrigation from a harvesting reservoir.",
    credit: "CIAT / Neil Palmer",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
    source: "https://commons.wikimedia.org/wiki/File:NP_Nicaragua65_lo_(5471858156).jpg",
  },
  {
    id: "irrigation-channel",
    src: irrigationChannel,
    tone: "progress",
    caption: "Water runs down an irrigation channel into a farmer's plot.",
    credit: "CIAT / Neil Palmer",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
    source: "https://commons.wikimedia.org/wiki/File:NP_Nicaragua32_lo_(5471246865).jpg",
  },
  {
    id: "farmer-at-reservoir",
    src: farmerAtReservoir,
    tone: "progress",
    caption: "A farmer hosting a stored-rainwater pilot project stands at the reservoir.",
    credit: "CIAT / Neil Palmer",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
    source: "https://commons.wikimedia.org/wiki/File:NP_Nicaragua69_lo_(5471860270).jpg",
  },
  {
    id: "field-team-recording-data",
    src: fieldTeamRecordingData,
    tone: "progress",
    caption: "A field team records data with community members at a project site.",
    credit: "CIAT / Neil Palmer",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
    source: "https://commons.wikimedia.org/wiki/File:NP_Nicaragua16_lo_(5471833084).jpg",
  },
  {
    id: "irrigated-crop-rows",
    src: irrigatedCropRows,
    tone: "progress",
    caption: "Healthy bean rows growing through the dry season on stored water.",
    credit: "CIAT / Neil Palmer",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
    source: "https://commons.wikimedia.org/wiki/File:NP_Nicaragua58_lo_(5471260885).jpg",
  },
  {
    id: "managua-treatment-plant",
    src: managuaTreatmentPlant,
    tone: "progress",
    caption: "The wastewater treatment plant serving Managua.",
    credit: "Juan C. Sequeira",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0",
    source:
      "https://commons.wikimedia.org/wiki/File:Planta_de_Tratamientos_Aguas_Residuales_de_Managua.jpg",
  },
];

export const photosByTone = (tone: PhotoTone): Photo[] =>
  photos.filter((photo) => photo.tone === tone);

export const photoById = (id: string): Photo | undefined =>
  photos.find((photo) => photo.id === id);
