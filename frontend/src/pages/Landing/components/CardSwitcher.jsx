import { useState, useEffect, useRef } from "react";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";
import styles from "./CardSwitcher.module.css";

const cardsData = [
    {
        title: "📊 Data Visualization with Charts",
        content: "Automatically generates charts based on financial data to provide a clear and attractive visualization. This feature helps with understanding spending patterns and supports better financial decisions.",
    },
    {
        title: "💸 Expenses and Incomes Management",
        content: "Supports the separate management of expenses and incomes through dedicated pages. Transactions can be added, edited, or deleted, with interactive sorting by amount, category/source, or date to facilitate data review.",
    },
    {
        title: "🎯 Savings Goals with Smart Allocation",
        content: "Allows the creation and tracking of custom savings goals through a dedicated interface. Surplus from the monthly planned budget can be automatically redirected to a selected goal to support consistent financial growth.",
    },
    {
        title: "🧮 Budget Planner",
        content: "Provides a dedicated interface for planning a monthly budget. The available amount can be distributed across expense categories using adjustable limits, while any remaining funds may be directed toward a savings goal.",
    },
    {
        title: "🔁 Recurrent Transactions",
        content: "Offers a dedicated section for managing recurring incomes and expenses. Each transaction can be scheduled with a specific frequency and execution day, ensuring consistent financial tracking over time.",
    },
];

function CardSwitcher() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [fadeClass, setFadeClass] = useState(styles["visible"]);
    const intervalRef = useRef(null);

    const nextIndex = () => (currentIndex + 1) % cardsData.length;
    const prevIndex = () => (currentIndex - 1 + cardsData.length) % cardsData.length;

    const switchCard = (newIndex) => {
        setIsTransitioning(true);
        setFadeClass("");
        setTimeout(() => {
            setCurrentIndex(newIndex);
            setFadeClass(styles["visible"]);
            setIsTransitioning(false);
        }, 500);
    };

    const handleNext = () => {
        if (!isTransitioning) switchCard(nextIndex());
    };

    const handlePrev = () => {
        if (!isTransitioning) switchCard(prevIndex());
    };

    useEffect(() => {
        intervalRef.current = setInterval(handleNext, 5000);
        return () => clearInterval(intervalRef.current);
    }, [currentIndex]);

    return (
        <div className={styles["card-switcher"]}>
            <button onClick={handlePrev}>
                <GoChevronLeft size={32} color="#2C3E50" />
            </button>
            <div className={`${styles["transition"]} ${fadeClass}`}>
                <h2 className={styles["card-title"]}>{cardsData[currentIndex].title}</h2>
                <p>{cardsData[currentIndex].content}</p>
            </div>
            <button onClick={handleNext}>
                <GoChevronRight size={32} color="#2C3E50" />
            </button>
        </div>
    );
}

export default CardSwitcher;