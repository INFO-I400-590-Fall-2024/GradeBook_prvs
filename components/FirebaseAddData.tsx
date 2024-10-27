import {collection, addDoc} from "firebase/firestore";
import {StyleSheet, TouchableOpacity} from "react-native";
import {ThemedText} from "./ThemedText";
import {db} from "@/firbase.config";

interface Student {
  name: string;
  age: number;
}

export default function FirebaseAddData() {
  // Sample data array with multiple students
  const studentsData: Student[] = [
    {
      name: "Ada Lovelace",
      age: 30,
    },
    {
      name: "Alan Turing",
      age: 28,
    },
    {
      name: "Grace Hopper",
      age: 35,
    },
  ];

  async function addStudents() {
    try {
      const results = await Promise.all(
        studentsData.map(async (student) => {
          const docRef = await addDoc(collection(db, "students"), student);
          console.log("Document written with ID: ", docRef.id);
          return {id: docRef.id, ...student};
        })
      );

      console.log("All students added successfully:", results);
    } catch (e) {
      console.error("Error adding documents: ", e);
    }
  }

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={addStudents}
      activeOpacity={0.7}>
      <ThemedText style={styles.buttonText}>Add Students</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0a7ea4",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
