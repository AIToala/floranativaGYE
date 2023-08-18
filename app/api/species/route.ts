/* eslint-disable @typescript-eslint/restrict-plus-operands */
import prisma from "@/app/libs/prismadb";
import { type Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const {
    taxonomy,
    stalk,
    seeds,
    root,
    leaf,
    flower,
    ethnobotany,
    ecology,
    arboriculture,
    images,
  } = await request.json();

  if (taxonomy == null) {
    return NextResponse.error();
  }
  if (taxonomy.genus == null || taxonomy.tSpecies == null) {
    return NextResponse.error();
  }
  for (const key in taxonomy) {
    if (
      taxonomy[key] === null ||
      taxonomy[key] === "" ||
      taxonomy[key] === undefined
    ) {
      taxonomy[key] = "No determinado";
    }
  }
  for (const key in stalk) {
    if (stalk[key] === null || stalk[key] === "" || stalk[key] === undefined) {
      stalk[key] = "No determinado";
    }
  }
  for (const key in seeds) {
    if (seeds[key] === null || seeds[key] === "" || seeds[key] === undefined) {
      seeds[key] = "No determinado";
    }
  }
  for (const key in root) {
    if (root[key] === null || root[key] === "" || root[key] === undefined) {
      root[key] = "No determinado";
    }
  }
  for (const key in leaf) {
    if (leaf[key] === null || leaf[key] === "" || leaf[key] === undefined) {
      leaf[key] = "No determinado";
    }
  }
  for (const key in flower) {
    if (
      flower[key] === null ||
      flower[key] === "" ||
      flower[key] === undefined
    ) {
      flower[key] = "No determinado";
    }
  }
  for (const key in ethnobotany) {
    if (
      ethnobotany[key] === null ||
      ethnobotany[key] === "" ||
      ethnobotany[key] === undefined
    ) {
      ethnobotany[key] = "No determinado";
    }
  }
  for (const key in ecology) {
    if (
      ecology[key] === null ||
      ecology[key] === "" ||
      ecology[key] === undefined
    ) {
      ecology[key] = "No determinado";
    }
  }
  for (const key in arboriculture) {
    if (
      arboriculture[key] === null ||
      arboriculture[key] === "" ||
      arboriculture[key] === "Float" ||
      arboriculture[key] === undefined
    ) {
      if (typeof arboriculture[key] === "number") arboriculture[key] = 0;
      arboriculture[key] = "No determinado";
    }
  }
  for (const key in images) {
    if (
      images[key] === null ||
      images[key] === "" ||
      images[key] === undefined ||
      images[key].length < 1
    ) {
      images[key] = "No determinado";
    }
  }

  let family = await prisma.speciesFamilyDetail.findUnique({
    where: {
      family: taxonomy.family,
    },
  });
  if (family == null) {
    family = await prisma.speciesFamilyDetail.create({
      data: {
        family: taxonomy.family,
        description: taxonomy.familyDescription,
      },
    });
  }
  const speciesD: Prisma.SpeciesCreateInput = {
    name: taxonomy.genus + " " + taxonomy.tSpecies,
    taxonomy: {
      create: {
        family: { connect: { id: family.id } },
        genus: taxonomy.genus,
        tSpecies: taxonomy.tSpecies,
        subspecies: taxonomy.subspecies,
        variety: taxonomy.variety,
        author: taxonomy.author,
        synonyms: { create: { synonym_name: taxonomy.synonyms } },
        etymology: taxonomy.etymology,
        common_names: taxonomy.common_names,
        growth_habit: taxonomy.growth_habit,
        bibliography: {
          create: {
            authors:
              taxonomy.bibliography === "No determinado"
                ? taxonomy.bibliography
                : taxonomy.bibliography.split(",")[0],
            publication_year:
              taxonomy.bibliography === "No determinado"
                ? taxonomy.bibliography
                : taxonomy.bibliography.split(",")[1],
            title:
              taxonomy.bibliography === "No determinado"
                ? taxonomy.bibliography
                : taxonomy.bibliography.split(",")[2],
            journal_name:
              taxonomy.bibliography === "No determinado"
                ? taxonomy.bibliography
                : taxonomy.bibliography.split(",")[3],
            DOI_URL:
              taxonomy.bibliography === "No determinado"
                ? taxonomy.bibliography
                : taxonomy.bibliography.split(",")[4],
          },
        },
      },
    },
    images:
      Object.keys(images).length > 0
        ? {
            create: {
              presentation_url: images.presentation_url,
              fruit_url: images.fruit_url,
              leaf_url: images.leaf_url,
              flower_url: images.flower_url,
              detailFlower_url: images.detailFlower_url,
              bark_url: images.bark_url,
              seed_url: images.seed_url,
            },
          }
        : {
            create: {
              presentation_url: "No determinado",
              fruit_url: "No determinado",
              leaf_url: "No determinado",
              flower_url: "No determinado",
              detailFlower_url: "No determinado",
              bark_url: "No determinado",
              seed_url: "No determinado",
            },
          },
    arboriculture:
      Object.keys(arboriculture).length > 0
        ? {
            create: {
              public_spaceUse: arboriculture?.public_spaceUse,
              flower_limitations: arboriculture.flower_limitations,
              fruit_limitations: arboriculture.fruit_limitations,
              longevity: arboriculture.longevity,
              pests_diseases: arboriculture.pests_iseases,
              light_requirements: arboriculture.light_requirements,
              growth_rate: arboriculture.growth_rate,
              maximum_height: parseFloat(arboriculture.maximum_height),
              crown_width: parseFloat(arboriculture.crown_width),
              crown_shape: arboriculture.crown_shape,
              DAP: parseFloat(arboriculture.DAP),
              foliage_density: arboriculture.foliage_density,
              soil_type: arboriculture.soil_type,
              humidity_zone: arboriculture.humidity_zone,
            },
          }
        : {},
    stalk:
      Object.keys(stalk).length > 0
        ? {
            create: {
              bark_attributes: stalk.bark_attributes,
              barkColor: stalk.bark_color,
            },
          }
        : {},
    seeds:
      Object.keys(seeds).length > 0
        ? {
            create: {
              fruitType: seeds.fruitType,
              dispersal_system: seeds.dispersal_system,
              fruit_attributes: seeds.fruit_attributes,
              seed_attributes: seeds.seed_attributes,
              fruiting_months: seeds.fruiting_months,
            },
          }
        : {},
    root:
      Object.keys(root).length > 0
        ? {
            create: {
              reproduction_form: root.reproduction_form,
              root_attributes: root.root_attributes,
              rooting_type: root.rooting_type,
            },
          }
        : {},
    leaf:
      Object.keys(leaf).length > 0
        ? {
            create: {
              leaf_attributes: leaf.leaf_attributes,
              leaf_persistence: leaf.leaf_persistence,
              stemLeaf_position: leaf.stemLeaf_position,
              leaf_composition: leaf.leaf_composition,
            },
          }
        : {},
    flower:
      Object.keys(flower).length > 0
        ? {
            create: {
              floral_attributes: flower.floral_attributes,
              flower_color: flower.flower_color,
              flower_arrangement: flower.flower_arrangement,
              flowering_season: flower.flowering_season,
              flowering_months: flower.flowering_months,
              pollination_system: flower.pollination_system,
            },
          }
        : {},
    ethnobotany:
      Object.keys(ethnobotany).length > 0
        ? {
            create: {
              category: ethnobotany.category,
              use_detail: ethnobotany.use_detail,
            },
          }
        : {},
    ecology:
      Object.keys(ecology).length > 0
        ? {
            create: {
              altitudinal_range: ecology.altitudinal_range,
              geo_distribution: ecology.geo_distribution,
              origin: ecology.origin,
              conservation_status: ecology.conservation_status,
              fauna_attraction: ecology.fauna_attraction,
              associated_fauna: {
                create: {
                  fauna_name:
                    ecology.associated_fauna === "No determinado"
                      ? ecology.associated_fauna
                      : ecology.associated_fauna
                          .split(",")
                          .map((item: any) => item.trim())
                          .sort()
                          .join(","),
                },
              },
            },
          }
        : {},
  };
  const species = prisma.species
    .create({
      data: speciesD,
    })
    .then(async () => {
      console.log("Species created");
    })
    .catch(async (e) => {
      console.error(e);
    });

  return NextResponse.json(species);
}

export async function PUT(request: Request) {
  const {
    id,
    availableStatus,
    taxonomy,
    stalk,
    seeds,
    root,
    leaf,
    flower,
    ethnobotany,
    ecology,
    arboriculture,
    images,
  } = await request.json();

  if (taxonomy == null) {
    return NextResponse.error();
  }

  const synonymsId = taxonomy.synonymsId;
  if (taxonomy.synonyms != null && synonymsId != null) {
    const existingSynonym = await prisma.speciesSynonyms.findUnique({
      where: { id: synonymsId },
    });

    if (existingSynonym != null) {
      await prisma.speciesSynonyms.update({
        where: { id: synonymsId },
        data: { synonym_name: taxonomy.synonyms },
      });
      console.log("Synonyms updated");
    } else {
      await prisma.speciesSynonyms.create({
        data: {
          taxonomy: { connect: { id } },
          synonym_name: taxonomy.synonyms,
        },
      });
      console.log("Synonyms created");
    }
  }

  if (taxonomy.bibliography != null && taxonomy.bibliographyId != null) {
    const bibliographyParts = taxonomy.bibliography
      .split(",")
      .map((item: any) => item.trim());
    const [authors, publicationYear, title, journalName, DOI_URL] =
      bibliographyParts;

    if (
      authors != null &&
      publicationYear != null &&
      title != null &&
      journalName != null &&
      DOI_URL != null
    ) {
      const bibliographyData = {
        authors,
        publication_year: publicationYear,
        title,
        journal_name: journalName,
        DOI_URL,
      };
      const existingBibliography = await prisma.speciesBibliography.findUnique({
        where: { id: taxonomy.bibliographyId },
      });
      if (existingBibliography != null) {
        await prisma.speciesBibliography.update({
          where: { id: taxonomy.bibliographyId },
          data: bibliographyData,
        });
        console.log("Bibliography updated");
      } else {
        await prisma.speciesBibliography.create({
          data: { taxonomy: { connect: { id } }, ...bibliographyData },
        });
        console.log("Bibliography created");
      }
    }
  }

  if (ecology.associatedFauna != null) {
    const associatedFaunaParts =
      ecology.associatedFauna === "No determinado"
        ? [ecology.associatedFauna]
        : ecology.associatedFauna
            .split(",")
            .map((item: any) => item.trim())
            .sort();

    if (associatedFaunaParts.length > 0) {
      const faunaData = associatedFaunaParts.join(",");

      const existingAssociatedFauna = await prisma.associated_Fauna.findUnique({
        where: { speciesId: id },
      });

      if (existingAssociatedFauna != null) {
        await prisma.associated_Fauna.update({
          where: { speciesId: id },
          data: { fauna_name: faunaData },
        });
        console.log("Associated fauna updated");
      } else {
        await prisma.associated_Fauna.create({
          data: { ecology: { connect: { id } }, fauna_name: faunaData },
        });
        console.log("Associated fauna created");
      }
    }
  }

  const speciesD: Prisma.SpeciesUpdateInput = {
    name: taxonomy.genus + taxonomy.tSpecies,
    availables_status: availableStatus,
    taxonomy: {
      update: {
        family: {
          update: {
            id: taxonomy.familyId,
            family: taxonomy.family,
            description: taxonomy.familyDescription,
          },
        },
        genus: taxonomy.genus,
        tSpecies: taxonomy.tSpecies,
        subspecies: taxonomy.subspecies,
        variety: taxonomy.variety,
        author: taxonomy.author,
        etymology: taxonomy.etymology,
        common_names:
          taxonomy.common_names === "No determinado"
            ? taxonomy.common_names
            : taxonomy.common_names
                .split(",")
                .map((item: any) => item.trim())
                .sort()
                .join(","),
        growth_habit: taxonomy.growth_habit,
      },
    },
    images: {
      update: images,
    },
    arboriculture: {
      update: arboriculture,
    },
    stalk: {
      update: stalk,
    },
    seeds: {
      update: seeds,
    },
    root: {
      update: root,
    },
    leaf: {
      update: leaf,
    },
    flower: {
      update: flower,
    },
    ethnobotany: {
      update: ethnobotany,
    },
    ecology: {
      update: ecology,
    },
  };

  const species = await prisma.species
    .update({
      where: { id },
      data: speciesD,
    })
    .catch((e) => {
      console.error(e);
      return NextResponse.error();
    });
  return NextResponse.json(species);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const species = await prisma.species.update({
    where: { id },
    data: {
      availables_status: false,
    },
  });
  return NextResponse.json(species);
}
