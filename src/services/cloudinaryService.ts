export const cloudinaryService = (upload_preset: string) => {
  return {
    cloudName: "hotelapp",
    uploadPreset: upload_preset,
    sources: ["local"],
    showAdvancedOptions: false,
    defaultSource: "local",
    styles: {
      palette: {
        window: "#F47E68",
        sourceBg: "#FFFFFF",
        windowBorder: "#F47E68",
        tabIcon: "#FFFFFF",
        inactiveTabIcon: "#FFDB92",
        menuIcons: "#FFFFFF",
        link: "#F47E68",
        action: "#FF2929",
        inProgress: "#000000",
        complete: "#F47E68",
        error: "#c43737",
        textDark: "#000000",
        textLight: "#FFFFFF",
      },
      fonts: {
        default: null,
        "'Poppins', sans-serif": {
          url: "https://fonts.googleapis.com/css?family=Poppins",
          active: true,
        },
      },
    },
  };
};
