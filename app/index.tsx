import InputBar from "@/components/inputBar";
import { Theme } from "@/constant/colors";
import { data } from "@/constant/data/todos";
import { useContext, useState, useEffect } from "react";
import {
  ColorSchemeName,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Poppins_300Light, useFonts } from "@expo-google-fonts/poppins";
import { ThemeContext } from "../components/themeContext";
import Feather from "@expo/vector-icons/Feather";
import Animated, { LinearTransition } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const [toDos, setToDos] = useState(data.sort((a, b) => a.id - b.id));
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [showComplete, setShowComplete] = useState(true);
  // @ts-ignore
  const { colorSchema, setColorSchema, theme } = useContext(ThemeContext);
  const styles = indexStyles(theme, colorSchema);
  const [loaded, error] = useFonts({ Poppins_300Light });

// use effect to fetch user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const todoItem = await AsyncStorage.getItem("TODO_APP");
        const storedTodos: data[] =
          todoItem != null ? JSON.parse(todoItem) : null;

        // Checks if the todo items are empty or not if empty then it gets value from the DATA file
        if (storedTodos && storedTodos.length) {
          setToDos(storedTodos.sort((a, b) => b.id - a.id));
        } else {
          setToDos(data.sort((a, b) => b.id - a.id));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [data]);

// use effect to store user data
  useEffect(
    ()=>{
        const storedData = async ()=>{
            try {
                const value= JSON.stringify(toDos)
                await AsyncStorage.setItem('TODO_APP',value)
            } catch (error) {
                console.error(error)
            }
        };
        storedData();
    },[toDos]
  );
  if (!loaded && !error) {
    return null;
  }
  const addTodo = () => {
    if (newTodo.title.trim()) {
      const newId = toDos.length + 1;
      setToDos([
        {
          id: newId,
          title: newTodo.title,
          description: newTodo.description,
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
    <View style={styles.todoItem}>
      <TouchableOpacity onPress={() => toggleToDo(item.id)} style={{ flex: 1 }}>
        <Text
          style={[
            item.completed === false ? styles.notCompleted : styles.Completed,
            styles.title,
            { flexWrap: "wrap" },
          ]}
          numberOfLines={1} // Prevent truncating title with too many lines
          ellipsizeMode="tail" // Add ellipsis if the text overflows
        >
          {item.title}
        </Text>
        {item.description && (
          <Text
            style={[
              item.completed === false ? styles.notCompleted : styles.Completed,
              styles.description,
              { flexWrap: "wrap" },
            ]}
          >
            {item.description}
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => removeTodo(item.id)}
        style={styles.deleteButton}
      >
        <AntDesign name="delete" size={28} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaProvider style={[styles.safeArea, { margin: 1 }]}>
      <View style={{ flexDirection: "column" }}>
        <InputBar
          TitlePlc="Title"
          colorSchema={colorSchema}
          DescriptionPLc="Description"
          titleText={newTodo.title}
          descriptionText={newTodo.description}
          ChangeTitle={(title: string) => setNewTodo({ ...newTodo, title })}
          ChangeDescription={(description: string) =>
            setNewTodo({ ...newTodo, description })
          }
          onClick={addTodo}
        />
        <View style={styles.toggleView}>
          {/* Hide and show completed todo's */}
          <TouchableOpacity
            style={[styles.ToggleButton]}
            onPress={toggleShowComplete}
          >
            <Text style={styles.toggleText}>
              {showComplete ? "Hide Completed" : "Show Completed"}
            </Text>
          </TouchableOpacity>
          {/* theme icon */}
          <TouchableOpacity
            style={{ flexGrow: 2 }}
            onPress={() =>
              setColorSchema(colorSchema === "dark" ? "light" : "dark")
            }
          >
            <Feather
              name={colorSchema === "dark" ? "moon" : "sun"}
              size={32}
              color="black"
            />
          </TouchableOpacity>
        </View>
        {/* displays the list */}
        <Animated.FlatList
          itemLayoutAnimation={LinearTransition}
          keyboardDismissMode="on-drag"
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
//                                  --------------------------------Styles--------------------------------
const indexStyles = (them: Theme, colorSchema: ColorSchemeName) => {
  return StyleSheet.create({
    safeArea: {
      backgroundColor: them.background,
    },
    title: {
      fontSize: 18,
      fontFamily: "Poppins_300Light",
    },
    description: {
      fontSize: 15,
      fontFamily: "Poppins_300Light",
    },
    Completed: {
      textDecorationLine: "line-through",
      color: colorSchema === "dark" ? "lightgray" : "gray",
      fontFamily: "Poppins_300Light",
    },
    notCompleted: {
      color: them.text,
      fontFamily: "Poppins_300Light",
    },
    toggleView: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 10,
    },
    ToggleButton: {
      //   width: "75%",
      //   maxWidth: "100%",
      flexGrow: 28,
      backgroundColor: "dodgerblue",
      borderRadius: 8,
      justifyContent: "center",
      alignSelf: "center",
      fontFamily: "Poppins_300Light",
    },
    toggleText: {
      height: 30,
      alignContent: "center",
      justifyContent: "center",
      color: "white",
      textAlign: "center",
      fontSize: 18,
      fontWeight: "500",
      fontFamily: "Poppins_300Light",
    },
    todoItem: {
      flexDirection: "row", // Changed to column direction to allow text to stack
      alignItems: "center", // Align text to the start
      justifyContent: "space-between",
      paddingVertical: 10,
      gap: 10,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: them.tint,
      width: "100%", // Ensure it takes full width
    },
    deleteButton: {
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
  });
};
