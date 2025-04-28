import { PrismaClient } from "@prisma/client";
import { randomBytes, scryptSync } from "node:crypto";
import appConfig from "../src/utils/appConfig.js";

const prisma = new PrismaClient();

const hashPassword = (password, salt) => {
  const hash = scryptSync(
    password,
    salt,
    appConfig.security.password.hashLength,
  ).toString("hex");

  return `${salt}$${hash}`;
};

async function main() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Deleting existing data...");

    await prisma.$executeRawUnsafe(
      'TRUNCATE TABLE "Service" RESTART IDENTITY CASCADE;',
    );

    await prisma.$executeRawUnsafe(
      'TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;',
    );

    await prisma.$executeRawUnsafe(
      'TRUNCATE TABLE "TextSection" RESTART IDENTITY CASCADE;',
    );

    await prisma.$executeRawUnsafe(
      'TRUNCATE TABLE "CarouselItem" RESTART IDENTITY CASCADE;',
    );

    await prisma.$executeRawUnsafe(
      'TRUNCATE TABLE "Address" RESTART IDENTITY CASCADE;',
    );
  }

  console.log("Seeding services...");

  await prisma.service.createMany({
    data: [
      {
        name: "Diagnostic Cyber",
        summary:
          "Audit complet de votre sécurité, de l'authentification aux fuites de données.",
        description: `Audit Organisationnel : Interviews avec les intervenants clés du SI, contrôle des accès et de l’authentification, sécurité des postes de travail, du réseau et de l’infrastructure, sensibilisation du personnel.
        Diagnostic Technique Interne/Externe : Audit de l’Active Directory et des politiques de mots de passe, évaluation du trafic réseau et des protocoles d’authentification, analyse approfondie de la surface d’exposition externe.
        Restitution et Livrable : Exposition des risques et vulnérabilités, plan d'action et recommandations détaillées pour améliorer la sécurité.`,
        companyBenefits: `Identification précise des faiblesses de sécurité.
        Recommandations personnalisées pour renforcer la sécurité.
        Amélioration de la sensibilisation à la sécurité au sein de l'organisation.`,
        technicalCharacteristics: `Protection Multi-terminaux : Analyse des postes de travail, serveurs et appareils mobiles.
        Intégration avec les Outils SOC Existants : Compatibilité avec les solutions de sécurité existantes pour une analyse complète.
        Gestion des Incidents : Identification et gestion des incidents de sécurité avec des recommandations pour la remédiation.
        Performances et Scalabilité : Capacité à gérer des environnements de toutes tailles, avec des analyses rapides et efficaces.
        Support 24/7 : Assistance continue avec un temps de réponse garanti par SLA.`,
        category: "Prévention",
        monthlyPrice: 375.0,
        annualPrice: 4500.0,
        perUserPrice: 15.0,
        perDevicePrice: 20.0,
        maxResources: 20,
        usedResources: 0,
        priority: 1,
        images: [
          "diagnostic_cyber_1",
          "diagnostic_cyber_2",
          "diagnostic_cyber_3",
        ],
      },
      {
        name: "Test d'intrusion",
        summary:
          "Simulation d'attaque interne et externe afin d’évaluer votre niveau de sécurité.",
        description: `Test d'Intrusion Black Box : Simulation d'attaque externe pour exploiter les vulnérabilités et évaluer le niveau de sécurité.
        Test d'Intrusion Grey Box : Simulation d'attaque interne, exploiter les vulnérabilités et évaluer le niveau de sécurité.
        Restitution et Livrable : Exposition des risques et des vulnérabilités, recommandations et aide à la remédiation, jeu d’un second test d’intrusion.`,
        companyBenefits: `Identification des vulnérabilités potentielles.
        Évaluation et amélioration continue de la sécurité.
        Préparation aux attaques réelles grâce à des simulations réalistes.`,
        technicalCharacteristics: `Simulation Réaliste : Utilisation de techniques d'attaque avancées pour des résultats précis.
        Rapports Détaillés : Fourniture de rapports complets sur les vulnérabilités et recommandations.
        Support Expert : Accompagnement par des experts en sécurité pour la remédiation.
        Scalabilité : Adaptation aux environnements de différentes tailles et complexités.
        Support 24/7 : Assistance continue pour répondre rapidement aux besoins de sécurité.`,
        category: "Prévention",
        monthlyPrice: 333.33,
        annualPrice: 4000.0,
        perUserPrice: 12.0,
        perDevicePrice: 18.0,
        maxResources: 20,
        availability: "UNAVAILABLE",
        usedResources: 0,
        images: ["test_intrusion_1", "test_intrusion_2", "test_intrusion_3"],
      },
      {
        name: "Micro SOC",
        summary:
          "Protection et monitoring à petite échelle de votre infrastructure.",
        description: `Protection EDR : Protection des postes de travail et des serveurs avec SentinelOne.
        Monitoring : Surveillance du Digital Workspace (M365/Google) avec Elastic.
        Service Managé 24/7 : Service managé en continu par nos analystes SOC, détection, analyse et blocage des menaces.
        Pilotage : Rapport de vulnérabilité hebdomadaire, rapport d'activité mensuel.
        Réponse à Incident : Disponibilité 24/7, intervention sous 2 jours.`,
        companyBenefits: `Surveillance continue et protection contre les menaces.
        Rapports réguliers pour une meilleure gestion de la sécurité.
        Intervention rapide en cas d'incident.`,
        technicalCharacteristics: `Protection Multi-terminaux : Protection des postes de travail, serveurs et appareils mobiles.
        Intégration avec les Outils SOC Existants : Compatibilité avec les solutions de sécurité existantes.
        Détection et Analyse des Menaces : Utilisation de technologies avancées pour la détection et l'analyse des menaces.
        Performances et Scalabilité : Capacité à gérer des environnements de toutes tailles.
        Support 24/7 : Assistance continue avec un temps de réponse garanti par SLA.`,
        category: "Protection",
        monthlyPrice: 416.67,
        annualPrice: 5000.0,
        perUserPrice: 20.0,
        perDevicePrice: 25.0,
        maxResources: 20,
        availability: "MAINTENANCE",
        usedResources: 0,
        images: ["micro_soc_1", "micro_soc_2", "micro_soc_3"],
      },
      {
        name: "SOC Managé",
        summary:
          "Surveillance 24/7 et gestion complète de la sécurité de vos infrastructures.",
        description: `Protection EDR : Protection des postes de travail et des serveurs avec SentinelOne.
        Monitoring : Surveillance du Digital Workspace (M365/Google) avec Elastic.
        Service Managé 24/7 : Service managé en continu par nos analystes SOC, détection, analyse et blocage des menaces, accompagnement personnalisé « Threat Hunting » et « Custom Rules ».
        Pilotage : Rapport de vulnérabilité hebdomadaire, rapport d'activité mensuel et 2 comités stratégiques Cyber.
        Réponse à Incident : Disponibilité 24/7, intervention sous 4 jours.`,
        companyBenefits: `Surveillance continue et protection avancée contre les menaces.
        Accompagnement personnalisé pour une sécurité optimale.
        Intervention rapide et efficace en cas d'incident.`,
        technicalCharacteristics: `Protection Multi-terminaux : Protection des postes de travail, serveurs et appareils mobiles.
        Intégration avec les Outils SOC Existants : Compatibilité avec les solutions de sécurité existantes.
        Détection et Analyse des Menaces : Utilisation de technologies avancées pour la détection et l'analyse des menaces.Performances et Scalabilité : Capacité à gérer des environnements de toutes tailles.
        Support 24/7 : Assistance continue avec un temps de réponse garanti par SLA.`,
        category: "Protection",
        monthlyPrice: 583.33,
        annualPrice: 7000.0,
        perUserPrice: 25.0,
        perDevicePrice: 30.0,
        maxResources: 20,
        usedResources: 0,
        images: ["soc_manage_1", "soc_manage_2", "soc_manage_3"],
      },
      {
        name: "Investigation, éradication, remédiation",
        summary:
          "Intervention complète en cas d'incident de sécurité pour éradiquer la menace.",
        description: `Investigation : Analyse forensique pour identifier les preuves de compromission.
        Éradication : Mesures adaptées pour éradiquer la menace.
        Remédiation : Mise en place de mesures pour éviter la récidive.`,
        companyBenefits: `Identification précise des incidents de sécurité.
        Éradication efficace des menaces.
        Prévention de la récidive grâce à des mesures correctives.`,
        technicalCharacteristics: `Analyse Forensique : Utilisation de techniques avancées pour l'analyse forensique.
        Mesures d'Éradication : Stratégies éprouvées pour éradiquer les menaces.
        Mesures de Remédiation : Mise en place de mesures pour prévenir les futurs incidents.
        Support Expert : Accompagnement par des experts en sécurité.
        Support 24/7 : Assistance continue pour une réponse rapide aux incidents.`,
        category: "Réponse",
        monthlyPrice: 708.33,
        annualPrice: 8500.0,
        perUserPrice: 30.0,
        perDevicePrice: 35.0,
        maxResources: 10,
        usedResources: 0,
        priority: 2,
        images: ["investigation_1", "investigation_2", "investigation_3"],
      },
    ],
    skipDuplicates: true,
  });

  console.log("Seeding categories...");
  await prisma.category.createMany({
    data: [
      {
        name: "Catégorie 1",
        description: "Description courte de la catégorie 1.",
        image: "soc",
        link: "/categories/1",
        priority: 3,
      },
      {
        name: "Catégorie 2",
        description: "Description courte de la catégorie 2.",
        image: "edr",
        link: "/categories/2",
        priority: 2,
      },
      {
        name: "Catégorie 3",
        description: "Description courte de la catégorie 3.",
        image: "xdr",
        link: "/categories/3",
        priority: 1,
      },
    ],
    skipDuplicates: true,
  });

  console.log("Seeding users ...");

  const salt = randomBytes(appConfig.security.password.saltLength).toString(
    "hex",
  );

  const hashedPasword = hashPassword("123Admin*", salt);

  await prisma.user.create({
    data: {
      firstName: "Admin",
      lastName: "MUUDMA",
      email: "muudma.solutions@gmail.com",
      role: "ADMIN",
      passwordHash: hashedPasword,
      passwordSalt: salt,
      emailVerified: true,
      verificationToken: null,
    },
  });

  console.log("Seeding text section...");

  await prisma.textSection.create({
    data: { content: "Votre sécurité est notre métier." },
  });

  console.log("Seeding new carousel item...");

  await prisma.carouselItem.createMany({
    data: [
      {
        title: "Service 1",
        description: "descritpion du Service 1",
        image: "carousel1",
        link: "/services/1",
      },
      {
        title: "Service 2",
        description: "descritpion du Service 2",
        image: "carousel2",
        link: "/services/2",
        priority: 1,
      },
      {
        title: "Service 3",
        description: "descritpion du Service 3",
        image: "carousel3",
        link: "/services/3",
        priority: 2,
      },
    ],
    skipDuplicates: true,
  });

  console.log("Seeding address ...");

  await prisma.address.create({
    data: {
      userId: 1,
      firstName: "Admin",
      lastName: "MUUDMA",
      addressLine1: "1 rue de la paix",
      city: "Paris",
      postalCode: "75010",
      country: "France",
      mobile: "0612345678",
      isDefault: true,
    },
  });

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
