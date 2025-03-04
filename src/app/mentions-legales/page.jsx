"use client";
import Text from "@@/ui/Text.jsx";

const makeExternalLink = (url = "") => {
  return (
    <a
      href={"https://www.cyna-it.fr" + url}
      target="_blank"
      className="underline"
      rel="noopener noreferrer"
    >
      https://www.cyna-it.fr
    </a>
  );
};

const MentionLegaleEtCGU = () => {
  return (
    <div className="flex min-h-screen flex-col gap-y-8 bg-secondary p-10 lg:p-20">
      <Text size="title1" className="text-center">
        MENTIONS LÉGALES ET CONDITIONS GÉNÉRALES D'UTILISATION
      </Text>

      <section>
        <Text>Définitions</Text>
        <Text>
          <span className="underline">Client </span>: tout professionnel ou
          personne physique capable au sens des articles 1123 et suivants du
          code civil, ou personne morale, qui visite le site objet des présentes
          conditions générales.
        </Text>
        <Text>
          <span className="underline">Contenu </span>: ensemble des éléments
          constituants l’information présente sur le site, notamment textes : “
          images : “ vidéos.
        </Text>
        <Text>
          Informations clients : ci-après dénommé « information(s) » qui
          correspondent à l’ensemble des données personnelles susceptibles
          d’être détenues par {makeExternalLink()} pour la gestion de votre
          compte, de la gestion de la relation client et à des fins d’analyses
          et de statistiques.
        </Text>
        <Text>
          <span className="underline">Utilisateur </span>: internaute se
          connectant, utilisant le site susnommé.
        </Text>
        <Text>
          Informations personnelles : « les informations qui permettent, sous
          quelque forme que ce soit, directement ou non, l'identification des
          personnes physiques auxquelles elles s'appliquent » (article 4 de la
          loi n° 78-17 du 6 janvier 1978).
        </Text>
        <Text>
          Les termes « données à caractère personnel », « personne concernée »,
          « sous-traitant » et « données sensibles » ont le sens défini par le
          règlement général sur la protection des données (rgpd : n° 2016-679)
        </Text>
      </section>

      <section>
        <Text className="underline">1. Présentation du site internet.</Text>
        <Text>
          En vertu de l’article 6 de la loi n° 2004-575 du 21 juin 2004 pour la
          confiance dans l’économie numérique, il est précisé aux utilisateurs
          du site internet {makeExternalLink()} l’identité des différents
          intervenants dans le cadre de sa réalisation et de son suivi :
        </Text>
        <Text>
          Propriétaire : sas cyna-it capital social de 1000 euros, numéro de tva
          : fr20913711032 : “ 10 rue de Penthièvre 75008 paris
        </Text>
        <Text>
          Responsable publication : elbaz alexandre{" "}
          <a href="mailto:“alexandre.elbaz@cyna-it.fr">
            "alexandre.elbaz@cyna-it.fr"
          </a>
        </Text>
        <Text>
          Le responsable publication est une personne physique ou une personne
          morale.
        </Text>
        <Text>Hébergeur : OVH : “ 2 rue kellermann 59100 roubaix 1007</Text>
        <Text>
          Délégué à la protection des données : nathan bramli :
          <a href="mailto:“nathan.bramli@cyna-it.fr">
            "nathan.bramli@cyna-it.fr"
          </a>
        </Text>
        <Text>
          Ces mentions légales rgpd sont issues du générateur gratuit de
          mentions légales pour un site internet
        </Text>
      </section>

      <section>
        <Text className="underline">
          2. Conditions générales d’utilisation du site et des services
          proposés.
        </Text>
        <Text>
          Le site constitue une œuvre de l’esprit protégée par les dispositions
          du code de la propriété intellectuelle et des réglementations
          internationales applicables. Le client ne peut en aucune manière
          réutiliser, céder ou exploiter pour son propre compte tout ou partie
          des éléments ou travaux du site.
        </Text>
        <Text>
          L’utilisation du site{makeExternalLink()} est implique l’acceptation
          pleine et entière des conditions générales d’utilisation ci-après
          décrites. Ces conditions d’utilisation sont susceptibles d’être
          modifiées ou complétées à tout moment, les utilisateurs du site
          {makeExternalLink()} sont donc invités à les consulter de manière
          régulière.
        </Text>
        <Text>
          Ce site internet est normalement accessible à tout moment aux
          utilisateurs. Une interruption pour raison de maintenance technique
          peut être toutefois décidée par {makeExternalLink()}, qui s’efforcera
          alors de communiquer préalablement aux utilisateurs les dates et
          heures de l’intervention. Le site web {makeExternalLink()} est mis à
          jour régulièrement par {makeExternalLink()} responsable. De la même
          façon, les mentions légales peuvent être modifiées à tout moment :
          elles s’imposent néanmoins à l’utilisateur qui est invité à s’y
          référer le plus souvent possible afin d’en prendre connaissance.
        </Text>
      </section>

      <section>
        <Text className="underline">3. Description des services fournis.</Text>
        <Text>
          Le site internet {makeExternalLink()} a pour objet de fournir une
          information concernant l’ensemble des activités de la société.{" "}
          {makeExternalLink()} s’efforce de fournir sur le site{" "}
          {makeExternalLink()} des informations aussi précises que possible.
          Toutefois, il ne pourra être tenu responsable des oublis, des
          inexactitudes et des carences dans la mise à jour, qu’elles soient de
          son fait ou du fait des tiers partenaires qui lui fournissent ces
          informations.
        </Text>

        <Text>
          Toutes les informations indiquées sur le site {makeExternalLink()}{" "}
          sont données à titre indicatif, et sont susceptibles d’évoluer. Par
          ailleurs, les renseignements figurant sur le site {makeExternalLink()}{" "}
          ne sont pas exhaustifs. Ils sont donnés sous réserve de modifications
          ayant été apportées depuis leur mise en ligne.
        </Text>
      </section>

      <section>
        <Text className="underline">
          4. Limitations contractuelles sur les données techniques.
        </Text>
        <Text>
          Le site utilise la technologie javascript. Le site internet ne pourra
          être tenu responsable de dommages matériels liés à l’utilisation du
          site. De plus, l’utilisateur du site s’engage à accéder au site en
          utilisant un matériel récent, ne contenant pas de virus et avec un
          navigateur de dernière génération mis-à-jour le site{" "}
          {makeExternalLink()} est hébergé chez un prestataire sur le territoire
          de l’union européenne conformément aux dispositions du règlement
          général sur la protection des données (rgpd : n° 2016-679)
        </Text>
        <Text>
          L'objectif est d’apporter une prestation qui assure le meilleur taux
          d’accessibilité. L’hébergeur assure la continuité de son service 24
          heures sur 24, tous les jours de l’année. Il se réserve néanmoins la
          possibilité d’interrompre le service d’hébergement pour les durées les
          plus courtes possibles notamment à des fins de maintenance,
          d’amélioration de ses infrastructures, de défaillance de ses
          infrastructures ou si les prestations et services génèrent un trafic
          réputé anormal. {makeExternalLink()} et l’hébergeur ne pourront être
          tenus responsables en cas de dysfonctionnement du réseau internet, des
          lignes téléphoniques ou du matériel informatique et de téléphonie lié
          notamment à l’encombrement du réseau empêchant l’accès au serveur.
        </Text>
      </section>

      <section>
        <Text className="underline">
          5. Propriété intellectuelle et contrefaçons.
        </Text>
        <Text>
          {makeExternalLink()} est propriétaire des droits de propriété
          intellectuelle et détient les droits d’usage sur tous les éléments
          accessibles sur le site internet, notamment les textes, images,
          graphismes, logos, vidéos, icônes et sons. Toute reproduction,
          représentation, modification, publication, adaptation de tout ou
          partie des éléments du site, quel que soit le moyen ou le procédé
          utilisé, est interdite, sauf autorisation écrite préalable de :
          {makeExternalLink()}. Toute exploitation non autorisée du site ou de
          l’un quelconque des éléments qu’il contient sera considérée comme
          constitutive d’une contrefaçon et poursuivie conformément aux
          dispositions des articles l.335-2 et suivants du code de propriété
          intellectuelle.
        </Text>
      </section>

      <section>
        <Text className="underline">6. Limitations de responsabilité.</Text>
        <Text>
          {makeExternalLink()} agit en tant qu’éditeur du site.{" "}
          {makeExternalLink("/mentions-l%C3%A9gales")} est responsable de la
          qualité et de la véracité du contenu qu’il publie.
        </Text>

        <Text>
          {makeExternalLink()} ne pourra être tenu responsable des dommages
          directs et indirects causés au matériel de l’utilisateur, lors de
          l’accès au site internet {makeExternalLink()}, et résultant soit de
          l’utilisation d’un matériel ne répondant pas aux spécifications
          indiquées au point 4, soit de l’apparition d’un bug ou d’une
          incompatibilité.
        </Text>

        <Text>
          {makeExternalLink()} ne pourra également être tenu responsable des
          dommages indirects (tels par exemple qu’une perte de marché ou perte
          d’une chance) consécutifs à l’utilisation du site {makeExternalLink()}
          . Des espaces interactifs (possibilité de poser des questions dans
          l’espace contact) sont à la disposition des utilisateurs.{" "}
          {makeExternalLink("/mentions-l%C3%A9gales")} se réserve le droit de
          supprimer, sans mise en demeure préalable, tout contenu déposé dans
          cet espace qui contreviendrait à la législation applicable en France,
          en particulier aux dispositions relatives à la protection des données.
          Le cas échéant, {makeExternalLink()}se réserve également la
          possibilité de mettre en cause la responsabilité civile et/ou pénale
          de l’utilisateur, notamment en cas de message à caractère raciste,
          injurieux, diffamant, ou pornographique, quel que soit le support
          utilisé (texte, photographie : ¦).
        </Text>
      </section>

      <section>
        <Text className="underline">7. Gestion des données personnelles.</Text>

        <Text>
          Le client est informé des réglementations concernant la communication
          marketing, la loi du 21 juin 2014 pour la confiance dans l’économie
          numérique, la loi informatique et liberté du 06 août 2004 ainsi que du
          règlement général sur la protection des données (rgpd : n° 2016-679).
        </Text>

        <div className="flex flex-col gap-y-8">
          <article>
            <Text className="underline">
              7.1 responsables de la collecte des données personnelles
            </Text>

            <Text>
              pour les données personnelles collectées dans le cadre de la
              création du compte personnel de l’utilisateur et de sa navigation
              sur le site, le responsable du traitement des données personnelles
              est : cyna-it. {makeExternalLink("/mentions-l%C3%A9gales")}
              représenté par bramli nathan, son représentant légal.
            </Text>

            <Text>
              En tant que responsable du traitement des données qu’il collecte,{" "}
              {makeExternalLink()} s’engage à respecter le cadre des
              dispositions légales en vigueur. Il lui appartient notamment au
              client d’établir les finalités de ses traitements de données, de
              fournir à ses prospects et clients, à partir de la collecte de
              leurs consentements, une information complète sur le traitement de
              leurs données personnelles et de maintenir un registre des
              traitements conforme à la réalité. Chaque fois que{" "}
              {makeExternalLink()} traite des données personnelles,
              {makeExternalLink()} prend toutes les mesures raisonnables pour
              s’assurer de l’exactitude et de la pertinence des données
              personnelles au regard des finalités pour lesquelles{" "}
              {makeExternalLink()} les traite.
            </Text>
          </article>

          <article>
            <Text className="underline">
              7.2 finalité des données collectées
            </Text>

            <Text>
              {makeExternalLink()} est susceptible de traiter tout ou partie des
              données :
            </Text>

            <Text>
              – Pour permettre la navigation sur le site et la gestion et la
              traçabilité des prestations et services commandés par
              l’utilisateur : données de connexion et d’utilisation du site,
              facturation, historique des commandes, etc.
            </Text>

            <Text>
              – Pour prévenir et lutter contre la fraude informatique (spamming,
              hacking: ¦) : matériel informatique utilisé pour la navigation,
              l’adresse ip, le mot de passe
            </Text>

            <Text>
              – Pour améliorer la navigation sur le site : données de connexion
              et d’utilisation pour mener des enquêtes de satisfaction
              facultatives sur {makeExternalLink()} : adresse email
            </Text>

            <Text>
              – Pour mener des campagnes de communication (sms, mail) : numéro
              de téléphone, adresse email
            </Text>

            <Text>
              {makeExternalLink()} ne commercialise pas vos données personnelles
              qui sont donc uniquement utilisées par nécessité ou à des fins
              statistiques et d’analyses.
            </Text>
          </article>

          <article>
            <Text className="underline">
              7.3 droit d’accès, de rectification et d’opposition
            </Text>

            <Text>
              conformément à la réglementation européenne en vigueur, les
              utilisateurs de {makeExternalLink()} disposent des droits suivants
              :
            </Text>

            <Text>
              Droit d’accès (article 15 rgpd) et de rectification (article 16
              rgpd), de mise à jour, de complétude des données des
            </Text>

            <Text>
              utilisateurs droit de verrouillage ou d’effacement des données des
              utilisateurs à caractère personnel (article 17 du rgpd),
              lorsqu’elles sont inexactes, incomplètes, équivoques, périmées, ou
              dont la collecte, l’utilisation, la communication ou la
              conservation est interdite droit de retirer à tout moment un
              consentement (article 13-2c rgpd) droit à la limitation du
              traitement des données des utilisateurs (article 18 rgpd) droit
              d’opposition au traitement des données des utilisateurs (article
              21 rgpd) droit à la portabilité des données que les utilisateurs
              auront fournies, lorsque ces données font l’objet de traitements
              automatisés fondés sur leur consentement ou sur un contrat
              (article 20 rgpd) droit de définir le sort des données des
              utilisateurs après leur mort et de choisir à qui{" "}
              {makeExternalLink()} devra communiquer (ou non) ses données à un
              tiers qu’ils aura préalablement désigné
            </Text>

            <Text>
              Dès que {makeExternalLink()} a connaissance du décès d’un
              utilisateur et à défaut d’instructions de sa part,{" "}
              {makeExternalLink()} s’engage à détruire ses données, sauf si leur
              conservation s’avère nécessaire à des fins probatoires ou pour
              répondre à une obligation légale.
            </Text>

            <Text>
              Si l’utilisateur souhaite savoir comment {makeExternalLink()}{" "}
              utilise ses données personnelles, demander à les rectifier ou
              s’oppose à leur traitement, l’utilisateur peut contacter{" "}
              {makeExternalLink()} par écrit à l’adresse suivante :
            </Text>

            <Text>Cyna-it : “ dpo, nathan bramli</Text>

            <Text>10 rue de penthièvre 75008 paris.</Text>

            <Text>
              Dans ce cas, l’utilisateur doit indiquer les données personnelles
              qu’il souhaiterait que {makeExternalLink()} corrige, mette àjour
              ou supprime, en s’identifiant précisément avec une copie d’une
              pièce d’identité (carte d’identité ou passeport).
            </Text>

            <Text>
              Les demandes de suppression de données personnelles seront
              soumises aux obligations qui sont imposées à {makeExternalLink()}{" "}
              par la loi, notamment en matière de conservation ou d’archivage
              des documents. Enfin, les utilisateurs de {makeExternalLink()}{" "}
              peuvent déposer une réclamation auprès des autorités de contrôle,
              et notamment de la cnil (
              <a
                href="https://www.cnil.fr/fr/plaintes)."
                target="_blank"
                rel="noreferrer noopener"
              >
                https://www.cnil.fr/fr/plaintes).
              </a>
            </Text>
          </article>

          <article>
            <Text className="underline">
              7.4 non-communication des données personnelles
            </Text>

            <Text>
              {makeExternalLink()} s’interdit de traiter, héberger ou transférer
              les informations collectées sur ses clients vers un pays situé en
              dehors de l’union européenne ou reconnu comme « non adéquat » par
              la commission européenne sans en informer préalablement le client.
              Pour autant,
            </Text>

            <Text>
              {makeExternalLink()} reste libre du choix de ses sous-traitants
              techniques et commerciaux à la condition qu’il présentent les
              garanties suffisantes au regard des exigences du règlement général
              sur la protection des données (rgpd : n° 2016-679).
            </Text>

            <Text>
              {makeExternalLink()} s’engage à prendre toutes les précautions
              nécessaires afin de préserver la sécurité des informations et
              notamment qu’elles ne soient pas communiquées à des personnes non
              autorisées. Cependant, si un incident impactant l’intégrité ou la
              confidentialité des informations du client est portée à la
              connaissance de {makeExternalLink()}, celle-ci devra dans les
              meilleurs délais informer le client et lui communiquer les mesures
              de corrections prises. Par ailleurs {makeExternalLink()} ne
              collecte aucune « données sensibles ».
            </Text>

            <Text>
              Les données personnelles de l’utilisateur peuvent être traitées
              par des filiales de {makeExternalLink()} et des sous-traitants
              (prestataires de services), exclusivement afin de réaliser les
              finalités de la présente politique.
            </Text>

            <Text>
              Dans la limite de leurs attributions respectives et pour les
              finalités rappelées ci-dessus, les principales personnes
              susceptibles d’avoir accès aux données des utilisateurs de{" "}
              {makeExternalLink()} sont principalement les agents de notre
              service client.
            </Text>
          </article>
        </div>
      </section>

      <section>
        <Text className="underline">8. Notification d’incident</Text>

        <Text>
          Quels que soient les efforts fournis, aucune méthode de transmission
          sur internet et aucune méthode de stockage électronique n’est
          complètement sûre. Nous ne pouvons en conséquence pas garantir une
          sécurité absolue. Si nous prenions connaissance d’une brèche de la
          sécurité, nous avertirions les utilisateurs concernés afin qu’ils
          puissent prendre les mesures appropriées. Nos procédures de
          notification d’incident tiennent compte de nos obligations légales,
          qu’elles se situent au niveau national ou européen. Nous nous
          engageons à informer pleinement nos clients de toutes les questions
          relevant de la sécurité de leur compte et à leur fournir toutes les
          informations nécessaires pour les aider à respecter leurs propres
          obligations réglementaires en matière de reporting.
        </Text>

        <Text>
          Aucune information personnelle de l’utilisateur du site{" "}
          {makeExternalLink()} n’est publiée à l’insu de l’utilisateur,
          échangée, transférée, cédée ou vendue sur un support quelconque à des
          tiers. Seule l’hypothèse du rachat de {makeExternalLink()} et de ses
          droits permettrait la transmission des dites informations à l’éventuel
          acquéreur qui serait à son tour tenu de la même obligation de
          conservation et de modification des données vis à vis de l’utilisateur
          du site {makeExternalLink()}.
        </Text>

        <Text>Sécurité</Text>

        <Text>
          Pour assurer la sécurité et la confidentialité des données
          personnelles et des données personnelles de santé,{" "}
          {makeExternalLink()} utilise des réseaux protégés par des dispositifs
          standards tels que par pare-feu, la pseudonymisation, l’encryption et
          mot de passe.
        </Text>

        <Text>
          Lors du traitement des données personnelles, {makeExternalLink()}{" "}
          prend toutes les mesures raisonnables visant à les protéger contre
          toute perte, utilisation détournée, accès non autorisé, divulgation,
          altération ou destruction.
        </Text>
      </section>

      <section>
        <Text className="underline">
          9. Liens hypertextes, cookies et balises internet
        </Text>

        <Text>
          le site {makeExternalLink()} contient un certain nombre de liens
          hypertextes vers d’autres sites, mis en place avec l’autorisation de{" "}
          {makeExternalLink()}. Cependant, {makeExternalLink()} n’a pas la
          possibilité de vérifier le contenu des sites ainsi visités, et
          n’assumera en conséquence aucune responsabilité de ce fait.
        </Text>

        <div className="flex flex-col gap-y-8">
          <Text>
            Sauf si vous décidez de désactiver les cookies, vous acceptez que le
            site puisse les utiliser. Vous pouvez à tout moment désactiver ces
            cookies et ce gratuitement à partir des possibilités de
            désactivation qui vous sont offertes et rappelées ci-après, sachant
            que cela peut réduire ou empêcher l’accessibilité à tout ou partie
            des services proposés par le site.
          </Text>

          <article>
            <Text className="underline">9.1. Cookies</Text>

            <Text>
              Un « cookie » est un petit fichier d’information envoyé sur le
              navigateur de l’utilisateur et enregistré au sein du terminal de
              l’utilisateur (ex : ordinateur, smartphone), (ci-après « cookies
              »). Ce fichier comprend des informations telles que le nom de
              domaine de l’utilisateur, le fournisseur d’accès internet de
              l’utilisateur, le système d’exploitation de l’utilisateur, ainsi
              que la date et l’heure d’accès. Les cookies ne risquent en aucun
              cas d’endommager le terminal de l’utilisateur.
            </Text>

            <Text>
              {makeExternalLink()} est susceptible de traiter les informations
              de l’utilisateur concernant sa visite du site, telles que les
              pages consultées, les recherches effectuées. Ces informations
              permettent à {makeExternalLink()} d’améliorer le contenu du site,
              de la navigation de l’utilisateur.
            </Text>

            <Text>
              Les cookies facilitant la navigation et/ou la fourniture des
              services proposés par le site, l’utilisateur peut configurer son
              navigateur pour qu’il lui permette de décider s’il souhaite ou non
              les accepter de manière à ce que des cookies soient enregistrés
              dans le terminal ou, au contraire, qu’ils soient rejetés, soit
              systématiquement, soit selon leur émetteur. L’utilisateur peut
              également configurer son logiciel de navigation de manière à ce
              que l’acceptation ou le refus des cookies lui soient proposés
              ponctuellement, avant qu’un cookie soit susceptible d’être
              enregistré dans son terminal.
              {makeExternalLink("/mentions-l%C3%A9gales")} informe l’utilisateur
              que, dans ce cas, il se peut que les fonctionnalités de son
              logiciel de navigation ne soient pas toutes disponibles.
            </Text>

            <Text>
              Si l’utilisateur refuse l’enregistrement de cookies dans son
              terminal ou son navigateur, ou si l’utilisateur supprime ceux qui
              y sont enregistrés, l’utilisateur est informé que sa navigation et
              son expérience sur le site peuvent être limitées. Cela pourrait
              également être le cas lorsque {makeExternalLink()} ou l’un de ses
              prestataires ne peut pas reconnaître, à des fins de compatibilité
              technique, le type de navigateur utilisé par le terminal, les
              paramètres de langue et d’affichage ou le pays depuis lequel le
              terminal semble connecté à internet.
            </Text>

            <Text>
              Le cas échéant, {makeExternalLink()} décline toute responsabilité
              pour les conséquences liées au fonctionnement dégradé du site et
              des services éventuellement proposés par {makeExternalLink()},
              résultant (i) du refus de cookies par l’utilisateur (ii) de
              l’impossibilité pour {makeExternalLink()} d’enregistrer ou de
              consulter les cookies nécessaires à leur fonctionnement du fait du
              choix de l’utilisateur. Pour la gestion des cookies et des choix
              de l’utilisateur, la configuration de chaque navigateur est
              différente. Elle est décrite dans le menu d’aide du navigateur,
              qui permettra de savoir de quelle manière l’utilisateur peut
              modifier ses souhaits en matière de cookies.
            </Text>

            <Text>
              A tout moment, l’utilisateur peut faire le choix d’exprimer et de
              modifier ses souhaits en matière de cookies.
              {makeExternalLink("/mentions-l%C3%A9gales")} pourra en outre faire
              appel aux services de prestataires externes pour l’aider à
              recueillir et traiter les informations décrites dans cette
              section.
            </Text>

            <Text>
              Enfin, en cliquant sur les icônes dédiées aux réseaux sociaux
              twitter, facebook, linkedin et google plus figurant sur le site de{" "}
              {makeExternalLink()} ou dans son application mobile et si
              l’utilisateur a accepté le dépôt de cookies en poursuivant sa
              navigation sur le site internet ou l’application mobile de
              {makeExternalLink()}, twitter, facebook, linkedin et google plus
              peuvent également déposer des cookies sur vos terminaux
              (ordinateur, tablette, téléphone portable).
            </Text>

            <Text>
              Ces types de cookies ne sont déposés sur vos terminaux qu’à
              condition que vous y consentiez, en continuant votre navigation
              sur le site internet ou l’application mobile de{" "}
              {makeExternalLink()}. A€ tout moment, l’utilisateur peut néanmoins
              revenir sur son consentement à ce que {makeExternalLink()} dépose
              ce type de cookies.
            </Text>
          </article>

          <article>
            <Text className="underline">Article 9.2. Balises internet</Text>

            <Text>
              {makeExternalLink()} peut employer occasionnellement des balises
              internet (également appelées « tags », ou balises d’action, gif à
              un pixel, gif transparents, gif invisibles et gif un à un) et les
              déployer par l’intermédiaire d’un partenaire spécialiste
              d’analyses web susceptible de se trouver (et donc de stocker les
              informations correspondantes, y compris l’adresse ip de
              l’utilisateur) dans un pays étranger.
            </Text>

            <Text>
              Ces balises sont placées à la fois dans les publicités en ligne
              permettant aux internautes d’accéder au site, et sur les
              différentes pages de celui-ci.
            </Text>

            <Text>
              Cette technologie permet à{makeExternalLink()} d’évaluer les
              réponses des visiteurs face au site et l’efficacité de ses actions
              (par exemple, le nombre de fois d’une page est ouverte et les
              informations consultées), ainsi que l’utilisation de ce site par
              l’utilisateur.
            </Text>

            <Text>
              Le prestataire externe pourra éventuellement recueillir des
              informations sur les visiteurs du site et d’autres sites internet
              grce àces balises, constituer des rapports sur l’activité du site
              à l’attention de {makeExternalLink()}, et fournir d’autres
              services relatifs à l’utilisation de celui-ci et d’internet.
            </Text>
          </article>
        </div>
      </section>

      <section>
        <Text>10. Droit applicable et attribution de juridiction.</Text>

        <Text>
          Tout litige en relation avec l’utilisation du site{" "}
          {makeExternalLink()} est soumis au droit français. En dehors des cas
          oà¹ la loi ne le permet pas, il est fait attribution exclusive de
          juridiction aux tribunaux compétents de paris
        </Text>
      </section>
    </div>
  );
};

export default MentionLegaleEtCGU;
