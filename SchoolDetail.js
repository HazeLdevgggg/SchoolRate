import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import StarRating from "react-native-star-rating";

export default function SchoolDetail({ route }) {
  const { name, ville, latitude, longitude } = route.params;

  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const [isRatingVisible, setIsRatingVisible] = useState(false);

  const region = {
    latitude,
    longitude,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  };

  const showRatingSection = () => {
    setIsRatingVisible(true);
  };

  const hideRatingSection = () => {
    setIsRatingVisible(false);
  };

  const submitRating = () => {
    setRating(0);
    setComments("");
    setIsRatingVisible(false);
  };

  // Ajout d'une note moyenne fictive (remplacez-la par la vraie logique)
  const averageRating = 4.5;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.subtitle}>Ville: {ville}</Text>

      <View style={styles.mapContainer}>
        <MapView style={styles.map} initialRegion={region}>
          <Marker
            coordinate={{ latitude, longitude }}
            title={name}
            description={`Latitude: ${latitude}, Longitude: ${longitude}`}
            pinColor="red"
          />
        </MapView>
      </View>

      <TouchableOpacity style={styles.ratingButton} onPress={showRatingSection}>
        <Text style={styles.ratingButtonText}>Laisser un avis</Text>
      </TouchableOpacity>

      <View style={styles.commentsContainer}>
        <View style={styles.averageRatingContainer}>
          <Text style={styles.averageRatingText}>Note Moyenne :</Text>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={averageRating}
            starSize={20}
            fullStarColor="yellow"
            emptyStarColor="white"
          />
        </View>
        <Text style={styles.commentsTitle}>
          Voici les autres commentaires...
        </Text>
        {/* Ajoutez ici la logique pour afficher les commentaires existants */}
      </View>

      <Modal
        transparent={true}
        visible={isRatingVisible}
        animationType="slide"
        onRequestClose={hideRatingSection}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Laisser un avis</Text>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={rating}
              selectedStar={(rating) => setRating(rating)}
              starSize={40}
              fullStarColor="yellow"
              emptyStarColor="white"
              halfStarColor="white"
              containerStyle={{ marginVertical: 40, paddingHorizontal: 50 }}
            />

            <ScrollView>
              <TextInput
                style={styles.commentInput}
                multiline
                numberOfLines={4}
                placeholder="Écrivez votre commentaire ici..."
                placeholderTextColor="white"
                value={comments}
                onChangeText={(text) => setComments(text)}
              ></TextInput>
            </ScrollView>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={submitRating}
            >
              <Text style={styles.submitButtonText}>Soumettre</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={hideRatingSection}
            >
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 16,
    textAlign: "center",
  },
  mapContainer: {
    width: 400,
    height: 400,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 10,
    alignSelf: "center",
  },
  map: {
    flex: 1,
  },
  ratingButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: "center",
  },
  ratingButtonText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
  },
  averageRatingContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  averageRatingText: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 5,
  },
  commentsContainer: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  commentsTitle: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
    marginTop: 40,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "black",
    padding: 16,
    borderRadius: 10,
    marginHorizontal: 16,
    borderWidth: 2,
    borderColor: "white",
  },
  modalTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  commentInput: {
    height: 80,
    borderColor: "white",
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    color: "white",
  },
  submitButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
  },
  closeButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
