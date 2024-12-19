import { Colors, Theme } from "@/constant/colors";
import {
  Appearance,
  Text,
  View,
  ColorSchemeName,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

interface InputBar {
  TitlePlc: string;
  DescriptionPLc: string;
  titleText: string;
  descriptionText?: string;
  ChangeTitle: any;
  ChangeDescription: any;
  onClick: () => void;
  colorSchema: ColorSchemeName; // Add colorSchema to props
}

export default function InputBar({
  TitlePlc,
  DescriptionPLc,
  titleText,
  descriptionText,
  ChangeTitle,
  ChangeDescription,
  onClick,
  colorSchema,
}: InputBar) {
  const theme = colorSchema === "dark" ? Colors.dark : Colors.light;
  const styles = inpStyle(theme, colorSchema);

  return (
    <>
      <View style={[styles.view, { gap: 1, margin: 1, borderRadius: 8 }]}>
        {/* Holds title, description HEADING */}
        <View style={[{ flexDirection: "row", gap: 10, margin: 3 }]}>
          <Text style={[styles.Text, styles.TitleText]}>Title</Text>
          <Text style={[styles.Text, styles.TitleText]}>Description</Text>
        </View>

        {/* Title and description input */}
        <View style={{ flexDirection: "row", gap: 14, margin: 5 }}>
          <TextInput
            style={styles.InpBox}
            placeholder={TitlePlc}
            placeholderTextColor={colorSchema === "dark" ? "gray" : "black"}
            autoCapitalize="sentences"
            value={titleText}
            onChangeText={ChangeTitle}
          />
          <TextInput
            style={styles.InpBox}
            placeholder={DescriptionPLc}
            placeholderTextColor={colorSchema === "dark" ? "gray" : "black"}
            value={descriptionText}
            onChangeText={ChangeDescription}
          />
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={onClick}>
          <Text style={styles.ButtonText}>ADD</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const inpStyle = (theme: Theme, colorSchema: ColorSchemeName) => {
  return StyleSheet.create({
    InpBox: {
      color: theme.text,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: colorSchema === "dark" ? "#C8CDC1" : "#535452",
      backgroundColor: colorSchema === "dark" ? "#4E4C4C" : "#E1DEDE",
      flexGrow: 1,
    },
    Text: {
      color: theme.text,
      textAlign: "auto",
    },
    TitleText: {
      fontWeight: "600",
      fontSize: 22,
      flexGrow: 1,
      width: "50%",
    },
    view: {
      backgroundColor: theme.background,
      // flexDirection:'row',
    },
    button: {
      backgroundColor: colorSchema === "dark" ? "#5CC218" : "#A2D580",
      alignSelf: "center",
      borderRadius: 15,
      borderWidth: 2,
      borderColor: colorSchema === "dark" ? "#C8CDC1" : "#535452",
      width: "45%",
      maxWidth: "20%",
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      marginVertical: 15,
    },

    ButtonText: {
      textAlign: "center",
      fontSize: 25,
      fontWeight: "700",
      color: theme.text,
    },
  });
};
