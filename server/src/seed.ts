import mongoose from "mongoose";
import { ProductModel } from "./models/product.model.js";
import { config } from "./config/index.js";

// The new list of 12 products for ShelfShare
const shelfShareProducts = [
  {
    name: "Object-Oriented vs. Functional Programming - Bridging the Divide between Opposing Paradigms",
    description:
      "The schism between the functional and object-oriented programmers is really a false binary. Yes, the first group argues that FP is superior for a multicore world, while the second insists that OOP is better at matching technical solutions to business problems. However, as this O'Reilly report explains, this is not an either-or proposition.\nThis book discusses similarities between these programming paradigms and points out that both FP and OOP are actually moving closer toward one another. One prominent example is the use of lambda expressions in Java and other OOP languages such as C#, C++, and Swift.",
    price: 500,
    imageUrl:
      "https://n6ky3pneh7v41k1z.public.blob.vercel-storage.com/Book_Images/Object-Oriented_vs_Functional_Programming.png",
    downloadUrl:
      "https://n6ky3pneh7v41k1z.public.blob.vercel-storage.com/Book_PDFs/object-oriented-vs-functional-programming.pdf?download=1",
  },
  {
    name: "The Super Programmer: A Colorful Introduction to Engineering!",
    description:
      "This book is for curious people who are eager to learn some of the most fundamental topics of computer and software engineering. A book discussing some of the most underrated topics in computer-science by implementing them from scratch!\nIt's is for the programmers who don't want to limit their knowledge and skills on a very narrow area of software engineering.",
    price: 300,
    imageUrl:
      "https://n6ky3pneh7v41k1z.public.blob.vercel-storage.com/Book_Images/The_Super_Programmer.png",
    downloadUrl:
      "https://n6ky3pneh7v41k1z.public.blob.vercel-storage.com/Book_PDFs/The-Super-Programmer.pdf?download=1",
  },
  {
    name: "The Shallow and the Deep: A Biased Introduction to Neural Networks and Old School Machine Learning",
    description:
      "This book is a collection of lecture notes that offers an accessible introduction to neural networks and machine learning in general. The focus lies on classical machine learning techniques, with a bias towards classification and regression.",
    price: 440,
    imageUrl:
      "https://n6ky3pneh7v41k1z.public.blob.vercel-storage.com/Book_Images/The_Shallow_and_the_Deep.png",
    downloadUrl:
      "https://n6ky3pneh7v41k1z.public.blob.vercel-storage.com/Book_PDFs/The_Shallow_and_the_Deep.pdf?download=1",
  },
  {
    name: "Think Data Structures: Algorithms and Information Retrieval in Java",
    description:
      "Data structures and algorithms are among the most important inventions of the last 50 years, and they are fundamental tools software engineers need to know. But in the author's opinion, most of the books on these topics are too theoretical, too big, and too 'bottom up'.\nBy emphasizing practical knowledge and skills over theory, author Allen Downey shows you how to use data structures to implement efficient algorithms, and then analyze and measure their performance.",
    price: 350,
    imageUrl:
      "https://n6ky3pneh7v41k1z.public.blob.vercel-storage.com/Book_Images/Think_Data_Structures.png",
    downloadUrl:
      "https://n6ky3pneh7v41k1z.public.blob.vercel-storage.com/Book_PDFs/Think_Data_Structures.pdf?download=1",
  },
  {
    name: "GitOps Cookbook: Kubernetes Automation in Practice",
    description:
      "Why are so many companies adopting GitOps for their DevOps and cloud native strategy? This reliable framework is quickly becoming the standard method for deploying apps to Kubernetes. With this practical, developer-oriented book, DevOps engineers, developers, IT architects, and SREs will learn the most useful recipes and examples for following GitOps practices.",
    price: 660,
    imageUrl:
      "https://n6ky3pneh7v41k1z.public.blob.vercel-storage.com/Book_Images/GitOps_Cookbook.png",
    downloadUrl:
      "https://n6ky3pneh7v41k1z.public.blob.vercel-storage.com/Book_PDFs/GitOps-Cookbook-Red-Hat-Developer.pdf?download=1",
  },
  {
    name: "Object-Oriented Programming in Python",
    description:
      "This book is an intuitive and thorough guide to mastering object-oriented programming from the ground up. You'll cover the basics of building classes and creating objects, and put theory into practice with clear examples that help visualize the object-oriented style.",
    price: 650,
    imageUrl:
      "https://n6ky3pneh7v41k1z.public.blob.vercel-storage.com/Book_Images/Object-Oriented_Programming_in_Python.png",
    downloadUrl:
      "https://n6ky3pneh7v41k1z.public.blob.vercel-storage.com/Book_PDFs/Object-Oriented_Programming_in_Python.pdf?download=1",
  },
  {
    name: "Eloquent JavaScript: A Modern Introduction to Programming",
    description:
      "Eloquent JavaScript, 4th Edition dives deep into the JavaScript language to show you how to write beautiful, effective code. Author Marijn Haverbeke immerses you in example code from the start, while exercises and full-chapter projects give you hands-on experience with writing your own programs.",
    price: 450,
    imageUrl:
      "https://n6ky3pneh7v41k1z.public.blob.vercel-storage.com/Book_Images/Eloquent_JavaScript.png",
    downloadUrl:
      "https://n6ky3pneh7v41k1z.public.blob.vercel-storage.com/Book_PDFs/Eloquent_JavaScript.pdf?download=1",
  },
  {
    name: "Programming Typescript: Making Your JavaScript Applications Scale",
    description:
      "Any programmer working with a dynamically typed language will tell you how hard it is to scale to more lines of code and more engineers. That's why Facebook, Google, and Microsoft invented gradual static type layers for their dynamically typed JavaScript and Python code. This practical book shows you how one such type layer, TypeScript, is unique among them: it makes programming fun with its powerful static type system.",
    price: 880,
    imageUrl:
      "https://n6ky3pneh7v41k1z.public.blob.vercel-storage.com/Book_Images/programming_typescript.png",
    downloadUrl:
      "httpshttps://n6ky3pneh7v41k1z.public.blob.vercel-storage.com/Book_PDFs/programming_typescript.pdf?download=1",
  },
  {
    name: "NGINX Cookbook: Advanced Recipes for High-Performance Load Balancing",
    description:
      "NGINX is one of the most widely used web servers available today. This book provides easy-to-follow examples of real-world problems in application delivery. Practical recipes help you set up and use either the open source or commercial offering to solve problems in various use cases.",
    price: 900,
    imageUrl:
      "https://n6ky3pneh7v41k1z.public.blob.vercel-storage.com/Book_Images/Complete_NGINX_Cookbook.png",
    downloadUrl:
      "https://n6ky3pneh7v41k1z.public.blob.vercel-storage.com/Book_PDFs/Complete_NGINX_Cookbook.pdf?download=1",
  },
  {
    name: "Learning Spark: Lightning-Fast Data Analytics",
    description:
      "This book shows data engineers and data scientists why structure and unification in Apache Spark matters. Specifically, it explains how to perform simple and complex data analytics and employ machine learning algorithms.",
    price: 600,
    imageUrl:
      "https://n6ky3pneh7v41k1z.public.blob.vercel-storage.com/Book_Images/Learning_Spark_Lightning-Fast_Big_Data_Analysis.png",
    downloadUrl:
      "https://n6ky3pneh7v41k1z.public.blob.vercel-storage.com/Book_PDFs/Learning_Spark_Lightning-Fast_Big_Data_Analysis.pdf?download=1",
  },
  {
    name: "Reactive Programming on Android with RxJava",
    description:
      "This book is a guide for experienced Android developers looking to learn about reactive programming using RxJava, the Java implementation of ReactiveX. It is written in a clear and concise way with many Android-specific examples.",
    price: 670,
    imageUrl:
      "https://n6ky3pneh7v41k1z.public.blob.vercel-storage.com/Book_Images/Reactive_Programming_on_Android_with_RxJava.png",
    downloadUrl:
      "https://n6ky3pneh7v41k1z.public.blob.vercel-storage.com/Book_PDFs/Reactive_Programming_on_Android_with_RxJava.pdf?download=1",
  },
  {
    name: "High Performance Browser Networking: What Every Web Developer Should Know about Networking and Web Performance",
    description:
      "This book provides a hands-on overview of what every web developer needs to know about the various types of networks (WiFi, 3G/4G), transport protocols (UDP, TCP, and TLS), application protocols (HTTP/1.1, HTTP/2), and APIs available in the browser (XHR, WebSocket, WebRTC, and more) to deliver the best - fast, reliable, and resilient - user experience.\nHow prepared are you when it comes to building network-enabled applications? This book provides what every web developer should know about the network - from fundamental limitations that affect performance to major innovations for building even more powerful browser apps. By understanding what the browser can and cannot do, you'll be able to make better design decisions and deliver faster web applications to your users.",
    price: 980,
    imageUrl:
      "https://n6ky3pneh7v41k1z.public.blob.vercel-storage.com/Book_Images/High_Performance_Browser_Networking.png",
    downloadUrl:
      "https://n6ky3pneh7v41k1z.public.blob.vercel-storage.com/Book_PDFs/High_Performance_Browser_Networking.pdf?download=1",
  },
];

const seedDatabase = async () => {
  console.log("Connecting to database...");
  try {
    await mongoose.connect(config.mongoUri);

    console.log("Cleaning existing products...");
    await ProductModel.deleteMany({});

    console.log("Inserting new products...");
    // Use the new product list here
    await ProductModel.insertMany(shelfShareProducts);

    console.log(
      `✅ Database successfully seeded with ${shelfShareProducts.length} products!`
    );
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from database.");
  }
};

seedDatabase();
