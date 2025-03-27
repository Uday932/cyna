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
        images: [
          {
            name: "diagnostic_cyber_1",
          },
          {
            name: "diagnostic_cyber_2",
          },
          {
            name: "diagnostic_cyber_3",
          },
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
        usedResources: 0,
        images: [
          {
            name: "test_intrusion_1",
          },
          {
            name: "test_intrusion_2",
          },
          {
            name: "test_intrusion_3",
          },
        ],
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
        usedResources: 0,
        images: [
          {
            name: "micro_soc_1",
          },
          {
            name: "micro_soc_2",
          },
          {
            name: "micro_soc_3",
          },
        ],
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
        images: [
          {
            name: "soc_manage_1",
          },
          {
            name: "soc_manage_2",
          },
          {
            name: "soc_manage_3",
          },
        ],
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
        images: [
          {
            name: "investigation_1",
          },
          {
            name: "investigation_2",
          },
          {
            name: "investigation_3",
          },
        ],
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
