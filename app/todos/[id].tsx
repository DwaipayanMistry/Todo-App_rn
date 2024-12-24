import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeContext } from "../../components/themeContext";
import { Poppins_300Light, useFonts } from "@expo-google-fonts/poppins";
import { useContext, useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InputBar from "@/components/inputBar";

interface TODO {
    title: string;
    description?: string;
    id: string;
};

export default function toDoEditPage() {
    const { id } = useLocalSearchParams();
    const [toDo, setToDo] = useState<TODO | null>(null);
    // @ts-ignore
    const { colorSchema, theme } = useContext(ThemeContext);
    const router = useRouter();

    const [loaded, error] = useFonts({ Poppins_300Light });

    // Fetching the data using the id
    useEffect(() => {
        const fetchData = async (id: string | string[]) => {
            try {
                if (!id) {
                    console.log("No id provided");
                    return;
                }

                const todoData = await AsyncStorage.getItem("TODO_APP");
                const storedTodos = todoData != null ? JSON.parse(todoData) : [];

                // Check if storedTodos exists and is an array
                if (Array.isArray(storedTodos)) {
                    const toDoItem = storedTodos.find((toDo: TODO) => toDo.id === id);
                    if (toDoItem) {
                        setToDo(toDoItem);
                    } else {
                        console.log(`${id} not found`);
                    }
                } else {
                    console.log("Invalid data in AsyncStorage");
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData(id);
    }, [id]);

    if (!loaded || error || !toDo) {
        return null; // Wait for fonts to load or data to be fetched
    }

    // Saving the data
    const saveTodo = async () => {
        try {
            if (!toDo || !toDo.id) {
                console.error("Todo is not valid, cannot save.");
                return;
            }

            const saveTodo = { ...toDo };

            const toDoData = await AsyncStorage.getItem("TODO_APP");
            const storedTodos = toDoData != null ? JSON.parse(toDoData) : [];

            if (Array.isArray(storedTodos)) {
                const updatedTodos = storedTodos.map((todo: TODO) =>
                    todo.id === toDo.id ? saveTodo : todo
                );

                await AsyncStorage.setItem("TODO_APP", JSON.stringify(updatedTodos));
                router.push("/"); // Navigate back after saving
            } else {
                console.log("Invalid data in AsyncStorage");
            }
        } catch (error) {
            console.error("Error saving todo: ", error);
        }
    };

    return (
        <SafeAreaProvider style={{
            backgroundColor: theme.background,
        }}>
            <View style={{
                backgroundColor: theme.background,
            }}>

                <TouchableOpacity onPress={() => router.push(`/`)} style={{
                    margin:5,
                    width: 35,
                    height: 35,
                    alignSelf: 'flex-end'
                }}>
                    <AntDesign name="leftcircleo" size={34} color={colorSchema === "dark" ? "white" : "black"}
                    />
                </TouchableOpacity>
                <InputBar
                    TitlePlc="Title"
                    colorSchema={colorSchema}
                    DescriptionPLc="Description"
                    titleText={toDo?.title || ""}
                    descriptionText={toDo?.description || ""}
                    ChangeTitle={(title: string) => setToDo((prev) => ({ ...prev!, title }))}
                    ChangeDescription={(description: string) => setToDo((prev) => ({ ...prev!, description }))}
                    onClick={saveTodo}
                    buttonText="Edit"
                />
            </View>
        </SafeAreaProvider>
    );
}
