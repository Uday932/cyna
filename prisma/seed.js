import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Deleting existing services...");
  await prisma.$executeRawUnsafe(
    'TRUNCATE TABLE "Service" RESTART IDENTITY CASCADE;',
  );

  console.log("Seeding new services...");
  await prisma.service.createMany({
    data: [
      {
        name: "Diagnostic Cyber",
        summary:
          "Audit complet de votre sécurité, de l'authentification aux fuites de données.",
        description: `Audit Organisationnel : Interview avec les intervenants clé du SI Contrôle des accès et de l’authentification, sécurité des postes, réseau, de l’infrastructure, sensibilisation du personnel.
        Diagnostic Technique Interne/Externe : Audit de l’AD et des politiques de MDP, évaluation du trafic réseau et des protocoles d’authentification, analyse approfondie de la surface d’exposition externe.
Restitution et livrable : Exposition des risques et vulnérabilités, plan d'action et recommandations.
        `,
        category: "Prévention",
        price: 4500.0,
        maxResources: 20,
      },
      {
        name: "Test d'intrusion",
        summary:
          "Simulation d'attaque interne et externe afin d’évaluer votre niveau de sécurité",
        description: `Test d'Intrusion Black Box : Simulation d'attaque externe pour exploiter les vulnérabilités et évaluer le niveau de sécurité.
          Test d'Intrusion Grey Box : Simulation d'attaque interne, exploiter les vulnérabilités et évaluer le niveau de sécurité.
          Restitution et livrable : Exposition des risques et des vulnérabilités, recommandations et aide à la remédiation, jeu d’un second test d’intrusion`,
        category: "Prévention",
        price: 4000.0,
        maxResources: 20,
      },
      {
        name: "Micro SOC",
        summary:
          "Protection et monitoring à petite échelle de votre infrastructure.",
        description: `Protection EDR : Postes de travail, serveurs avec SentinelOne.
        Monitoring : Digital Workspace (M365/Google) avec Elastic.
        Service Managé 24/7 : Service managé en continu par nos analystes SOC et détection, analyse et blocage des menaces
        Pilotage : Rapport de vulnérabilité hebdomadaire, rapport d'activité mensuel
        Réponse à incident : Disponibilité 24/7, intervention sous 2 jours.`,
        category: "Protection",
        price: 5000.0,
        maxResources: 20,
      },
      {
        name: "SOC Managé",
        summary:
          "Surveillance 24/7 et gestion complète de la sécurité de vos infrastructures.",
        description: `Protection EDR : Postes de travail, serveurs avec SentinelOne.
        Monitoring : Digital Workspace (M365/Google) avec Elastic.
        Service Managé 24/7 : Service managé en continu par nos analystes SOC, détection, analyse et blocage des menaces, accompagnement personnalisé « Threat Hunting » et « Custom Rules »
        Pilotage : Rapport de vulnérabilité hebdomadaire, rapport d'activité mensuel et 2 comités stratégiques Cyber
        Réponse à incident : Disponibilité 24/7, intervention sous 4 jours.`,
        category: "Protection",
        price: 7000.0,
        maxResources: 20,
      },
      {
        name: "Investigation, éradication, remédiation",
        summary:
          "Intervention complète en cas d'incident de sécurité pour éradiquer la menace.",
        description: `Investigation : Analyse forensique pour identifier les preuves de compromission.
        Éradication : Mesures adaptées pour éradiquer la menace
        Remédiation : Mise en place de mesures pour éviter la récidive`,
        category: "Réponse",
        price: 8500.0,
        maxResources: 10,
      },
    ],
    skipDuplicates: true,
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
