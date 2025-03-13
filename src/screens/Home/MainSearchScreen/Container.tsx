import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { decrement, increment } from "@/store/slices/counterSlice";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { githubApi } from "@/api/endpoints";
import { useEffect } from "react";

export default function Container() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const test = async () => {
    const { data, status } = await githubApi.searchRepositories({
      q: "react-native",
      page: 1,
    });
    console.log(data);
  };

  useEffect(() => {
    test();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => dispatch(increment())}>
        <Text>++</Text>
      </TouchableOpacity>
      <Text>{count}</Text>
      <TouchableOpacity onPress={() => dispatch(decrement())}>
        <Text>--</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
