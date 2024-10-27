import {useEffect, useState} from "react";
import {StyleSheet} from "react-native";
import {collection, getDocs} from "firebase/firestore";

import {ThemedView} from "./ThemedView";
import {ThemedText} from "./ThemedText";
import {db} from "@/firbase.config";

interface Student {
  id: string;
  name: string;
  age: number;
}

export default function FirebaseFetcher() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "students"));
        const studentData: Student[] = [];
        querySnapshot.forEach((doc) => {
          studentData.push({
            id: doc.id,
            ...(doc.data() as Omit<Student, "id">),
          });
        });
        setStudents(studentData);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type='subtitle' style={styles.title}>
        Student List
      </ThemedText>
      {students.map((student) => (
        <ThemedView key={student.id} style={styles.studentCard}>
          <ThemedText style={styles.studentName}>{student.name}</ThemedText>
          <ThemedText style={styles.studentAge}>Age: {student.age}</ThemedText>
        </ThemedView>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  title: {
    marginBottom: 16,
  },
  studentCard: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    marginBottom: 8,
  },
  studentName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  studentAge: {
    fontSize: 16,
    color: "#666",
  },
});
