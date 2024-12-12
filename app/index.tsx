import InputBar from "@/components/inputBar";
import { Colors, Theme } from "@/constant/colors";
import { data } from "@/constant/data/todos";
import { useState } from "react";
import {
  Appearance,
  ColorSchemeName,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Index() {
  const [toDos, setToDos] = useState(data.sort((a, b) => a.id - b.id));
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [showComplete, setShowComplete] = useState(true);
  const colorSchema = Appearance.getColorScheme();
  const theme = colorSchema === "dark" ? Colors.dark : Colors.light;
  const styles = indexStyles(theme, colorSchema);
  const addTodo = () => {
    if (newTodo.title.trim() && newTodo.description.trim()) {
      const newId = toDos.length + 1;
      setToDos([
        {
          id: newId,
          title: newTodo.title,
          completed: false,
        },
        ...toDos,
      ]);
      setNewTodo({ title: "", description: "" });
    }
  };
  const toggleToDo = (id: number) => {
    setToDos(
      toDos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setToDos(toDos.filter((todo) => todo.id !== id));
  };
  const toggleShowComplete = () => {
    setShowComplete(!showComplete);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View>
      {/* <Pressable onPress={() => toggleToDo(item.id)}>
      </Pressable> */}

      <TouchableOpacity onPress={() => toggleToDo(item.id)}>
        <Text
          style={
            [item.completed === false ? styles.notCompleted : styles.Completed,styles.title]
          }
        >
          {item.title}
        </Text>
        <Text
          style={
            [item.completed === false ? styles.notCompleted : styles.Completed,styles.description]
          }
        >
          {item.title}
          {item.description}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaProvider style={[styles.safeArea, { margin: 1 }]}>
      <View>
        <InputBar
          TitlePlc="Title"
          DescriptionPLc="Description"
          titleText={newTodo.title}
          descriptionText={newTodo.description}
          ChangeTitle={(title: string) => setNewTodo({ ...newTodo, title })}
          ChangeDescription={(description: string) =>
            setNewTodo({ ...newTodo, description })
          }
          onClick={addTodo}
        />
        <TouchableOpacity
          style={styles.ToggleButton}
          onPress={toggleShowComplete}
        >
          <Text style={styles.toggleText}>
            {showComplete ? "Hide Completed" : "Show Completed"}
          </Text>
        </TouchableOpacity>
        <FlatList
          data={
            showComplete ? toDos : toDos.filter((toDos) => !toDos.completed)
          }
          renderItem={renderItem}
          keyExtractor={(toDo) => toDo.id.toString()}
        />
      </View>
    </SafeAreaProvider>
  );
}

// --------------------------------Styles--------------------------------

const indexStyles = (them: Theme, colorSchema: ColorSchemeName) => {
  return StyleSheet.create({
    safeArea: {
      backgroundColor: them.background,
    },
    title:{
      fontSize: 18
    },
    description:{
      fontSize:15
    },
    Completed: {
      textDecorationLine: "line-through",
      color: colorSchema === "dark" ? "lightgray" : "gray",
    },
    notCompleted: {
      color: them.text,
    },
    ToggleButton: {
      width: "100%",
      maxWidth: "75%",
      backgroundColor: "dodgerblue",
      borderRadius: 8,
      justifyContent: "center",
      alignSelf: "center",
    },
    toggleText: {
      height: 30,
      alignContent: "center",
      justifyContent: "center",
      color: "white",
      textAlign: "center",
      fontSize: 18,
      fontWeight: "500",
    },
  });
};
