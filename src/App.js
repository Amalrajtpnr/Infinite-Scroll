import React, { useState, useEffect } from "react";

const styles = {
  App: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
    justifyContent: "center",
  },
  item: {
    width: "300px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  itemName: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  itemDescription: {
    fontSize: "14px",
    marginBottom: "10px",
  },
  itemImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "5px",
  },
  load: {
    width: "70%",
    height: "50px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    alignItems: "center",
  },
  button: {
    width: "18%",
    height: "70px",
    objectFit: "cover",
    borderRadius: "5px",
  },
};

function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  const fetchImages = async (pageNumber) => {
    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${pageNumber}&limit=10`
      );
      if (response.ok) {
        const data = await response.json();
        setImages([...images, ...data]);
      } else {
        console.error("Error fetching images:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages(page);
  }, [page]);

  const loadMoreImages = () => {
    setPage(page + 1);
  };

  return (
    <div className="App">
      <h1>Bitcoin News</h1>
      <div style={styles.container}>
        {images.map((image) => (
          <div key={image.id} style={styles.item}>
            <img
              src={image.download_url}
              alt={image.author}
              style={styles.itemImage}
            />
            <h3 style={styles.itemName}>{image.author}</h3>
            <p style={styles.itemDescription}>{image.author}</p>
          </div>
        ))}
      </div>
      <div style={styles.load}>
        <button onClick={loadMoreImages} style={styles.button}>
          Load More
        </button>
      </div>
    </div>
  );
}

export default App;
