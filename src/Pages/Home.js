import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "./Home.css";
// import axios from "axios";
// axios.defaults.adapter = require('axios/lib/adapters/xhr');


export const Home = () => {
    const [categories, setCategories] = useState([]);
    const [featuredBooks, setFeaturedBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading,setLoading] =useState(true)
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryResponse = await fetch("http://localhost:8080/api/books/categories");
        const categoriesData = await categoryResponse.json();
        setCategories(categoriesData);

        const booksResponse = await fetch("http://localhost:8080/api/books/featured");
        const booksData = await booksResponse.json();
        setFeaturedBooks(booksData);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Could not load data. Showing default content.");
            } finally {
                setLoading(false);
            }
        }

        fetchData()
    }, [])

    return (
        <div>
            <section className="hero-container">
                <div className="hero-content">
                    <h1>📚 Campus Library Management System</h1>
                    <p> Browse, borrow, and manage your books easily.</p>
                </div>
            </section>

        <div className="home-content">
            <Link to="/books" className="home-link">Explore Books</Link>
            <Link to="/borrowed" className="home-link"> Borrowed Books</Link>
            <Link to="/about" className="home-link">About Us</Link>
            <Link to="/login" className="home-link">Login</Link>
            <Link to="/register" className="home-link">Register</Link>
        </div>

        <section className="categories">
            <div className="category-list">
                <h2>Book Categories</h2>
                <div className="allcategories">
                    {categories.map(cat => (
                <p
                key={cat._id}
                className="category-items"
                onClick={() => setSelectedCategory(cat.name)}
                >
                {cat.name}
                </p>
            ))}
                    <p className="category-items" onClick={()=> setSelectedCategory("")}>
                        All Books
                    </p>
        </div>
        </div>
        </section>

        <section className="featured-books">
            <h1>Browse through our available books</h1>
            <div className="book-list">
                {featuredBooks.length > 0 ? (
                    featuredBooks.filter(book => selectedCategory ? book.category?.name === selectedCategory : true)
                    .map((book) => (
                        <div className="book-card" key={book._id}>
                        <Link to={`/books/${book._id}`}>
                            <img src={book.imageUrl} alt={book.title} className="book-image" />
                            </Link>
                            <h2>{book.title}</h2>
                            <p>{book.author}</p>
                            <p>{book.description}</p>
                            <h3>Published: {book.publishedYear}</h3>
                            <h4>Category: {book.category?.name}</h4>
                            <h3>{book.available ? "Available" : "Currently Borrowed"}</h3>
                        </div>
                    ))
                ) : (
                    <p>No featured books available.</p>
                )}
            </div>
        </section>
        {loading && <p>Loading featured books...</p>}

        </div>
    )
}


export default Home;