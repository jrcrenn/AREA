### Format des configurations d'actions

utilisé pour générer les formulaires de configuration des actions

## exemple:

```json
  {
    "email": {
      "type": "textfield",
      "label": "Email",
      "hint": "example@example.com",
      "validators": {
        "email": {
          "error": "Email incorrect"
        },
        "required": {
          "error": "Champ requis"
        }
      }
    },
    "password": {
      "type": "textfield",
      "label": "Mot de passe",
      "obscure": true,
      "validators": {
        "minlength": 4,
        "required": {
          "error": "Champ requis"
        }
      }
    },
    "accept": {
      "type": "checkbox",
      "default": false,
      "label": "Accepter les conditions d'utilisation",
      "validators": {
        "requiredtrue": { "error": "Vous devez accepter les conditions d'utilisation" }
      }
    }
  }
```

La validation de ce formulaire doit renvoyer un JSON semblable à celui-ci

```json
{
  "email": "example@example.com",
  "password": "toto",
  "accept": true
}
```

## Spécifications

chaque champ du formulaire est défini par un objet JSON devant posséder obligatoirement un attribut "type"

les types possibles sont:
- textfield
- dropdown
- checkbox

les autres attributs possibles sont les suivants:

# default

*type: Variable*

Permet de définir la valeur par défaut du champ

# label

*type: String*

Le texte à afficher au dessus du champ

# hint

*type: String*

Le hint ou placeholder à afficher
*ne s'applique pas sur les checkbox*

# validators

*type: Validator*

Action a effectuer pour vérifier le texte entré
plusieurs types de validators peuvent etre utilisés en meme temps

Un validator se présente de la maniere suivante:

```json
{
  "[type]": {
    "arg": 1,
    "error": "Message d'erreur"
  }
}
```

L'attribut "error" est optionnel et le validator peut etre simplifié de cette façon:

```json
{
  "[type]": 1
}
```

Ici 1 est l'argument à passer au validator

type de validators possibles et leur argument (aucun si non précisé):
- regex (String)
- email
- url
- numeric
- creditcard
- ip (Integer) -> version 4 ou 6 ou rien pour accepter les 2
- min (Integer)
- max (Integer)
- minlength (Integer)
- maxlength (Integer)
- required -> le champ ne doit pas etre vide
- requiredtrue -> pour les checkbox uniquement, doit obligatoirement etre cochée
- date

## attributs spécifiques aux textfields

# obscure

*type: Bool*
*default: false*

Permet de cacher le texte entré (mot de passe)

# trim

*type: Bool*
*default: true*

Supprime les trailing spaces dans le texte entré

# maxlines

*type: Integer*
*default: 1*

Nombre de lignes maximum

## attribut spécifique aux dropdown

# items

*type: List<String>*

La liste des choix possibles du dropdown
