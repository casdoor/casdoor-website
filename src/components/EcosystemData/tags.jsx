import {translate} from "@docusaurus/Translate";

const colorList = [
  "#C99F55", "#6C0931", "#D59F40", "#D1BB6A",
  "#7EF24F", "#247515", "#266494", "#27B961",
  "#5DD72D", "#B288CA", "#887292", "#778C62",
  "#A476DD", "#9BB75E", "#9A7577", "#2355D8",
  "#01923F", "#9D94D7", "#2318DA", "#7BCD3B",
  "#69FD3D", "#E397B0", "#07AACF", "#9512AA",
];
const tag = {
  Integration: {
    label: translate({message: "Integration"}),
    description: translate({
      message: "go language",
      id: "showcase.tag.favorite.description",
    }),
  },
  OAuth: {
    label: translate({message: "OAuth"}),
    description: translate({
      message: "go language",
      id: "showcase.tag.favorite.description",
    }),
  },
  Email: {
    label: translate({message: "Email"}),
    description: translate({
      message: "go language",
      id: "showcase.tag.favorite.description",
    }),
  },
  SMS: {
    label: translate({message: "SMS"}),
    description: translate({
      message: "go language",
      id: "showcase.tag.favorite.description",
    }),
  },
  Notification: {
    label: translate({message: "Notification"}),
    description: translate({
      message: "go language",
      id: "showcase.tag.favorite.description",
    }),
  },
  Storage: {
    label: translate({message: "Storage"}),
    description: translate({
      message: "go language",
      id: "showcase.tag.favorite.description",
    }),
  },
  SAML: {
    label: translate({message: "SAML"}),
    description: translate({
      message: "go language",
      id: "showcase.tag.favorite.description",
    }),
  },
  Captcha: {
    label: translate({message: "Captcha"}),
    description: translate({
      message: "go language",
      id: "showcase.tag.favorite.description",
    }),
  },
  Web3: {
    label: translate({message: "Web3"}),
    description: translate({
      message: "go language",
      id: "showcase.tag.favorite.description",
    }),
  },
  Provider: {
    label: translate({message: "Provider"}),
    description: translate({
      message: "go language",
      id: "showcase.tag.favorite.description",
    }),
  },
  Cpp: {
    label: translate({message: "Cpp"}),
    description: translate({
      message:
                "Cpp language",
      id: "showcase.tag.favorite.description",
    }),
  },
  Csharp: {
    label: translate({message: "Csharp"}),
    description: translate({
      message:
                "Cpp language",
      id: "showcase.tag.favorite.description",
    }),
  },
  Go: {
    label: translate({message: "Go"}),
    description: translate({
      message: "go language",
      id: "showcase.tag.favorite.description",
    }),
  },
  Java: {
    label: translate({message: "Java"}),
    description: translate({
      message:
                "Java language",
      id: "showcase.tag.favorite.description",
    }),
  },
  JavaScript: {
    label: translate({message: "JavaScript"}),
    description: translate({
      message: "NodeJS runtime",
      id: "showcase.tag.favorite.description",
    }),
  },
  Lua: {
    label: translate({message: "Lua"}),
    description: translate({
      message:
                "Lua language",
      id: "showcase.tag.favorite.description",
    }),
  },
  PHP: {
    label: translate({message: "PHP"}),
    description: translate({
      message:
                "PHP language",
      id: "showcase.tag.favorite.description",
    }),
  },
  Ruby: {
    label: translate({message: "Ruby"}),
    description: translate({
      message:
                "Ruby language",
      id: "showcase.tag.favorite.description",
    }),
  },
  Haskell: {
    label: translate({message: "Haskell"}),
    description: translate({
      message:
                "Ruby language",
      id: "showcase.tag.favorite.description",
    }),
  },
  Python: {
    label: translate({message: "Python"}),
    description: translate({
      message:
                "Python Language",
      id: "showcase.tag.favorite.description",
    }),
  },
  SDK: {
    label: translate({message: "SDK"}),
    description: translate({
      message:
                ".NET runtime",
      id: "showcase.tag.favorite.description",
    }),
  },
  Mobile: {
    label: translate({message: "Mobile"}),
    description: translate({
      message:
                "Rust language",
      id: "showcase.tag.favorite.description",
    }),
  },

  Desktop: {
    label: translate({message: "Desktop"}),
    description: translate({
      message:
                "Swift language",
      id: "showcase.tag.favorite.description",
    }),
  },

  Web: {
    label: translate({message: "Web"}),
    description: translate({
      message: "Adapter",
      id: "showcase.tag.opensource.description",
    }),
  },
};
Object.keys(tag).forEach((key, index) => {
  tag[key].color = colorList[index];
});

export const Tags = tag;

export const TagList = Object.keys(Tags);
