import React, { useEffect, useState } from "react";
import { fetchGenres } from "../../Service/AxiosService";
import Select from "react-select";

const Filters = ({ onFilter }) => {
    const [filters, setFilters] = useState({
        searchTerm: "",
        points: "",
        stars: "",
        genre: [],
        dateFrom: "",
        dateTo: "",
        sortOption: "title",
    });
    const [genres, setGenres] = useState([]);
    const token = localStorage.getItem("token");

    console.log(filters);

    const pointsOptions = [
        { label: "None", value: null},
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
    ];

    const starsOptions = [
        { label: "None", value: null},
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
        { label: "5", value: "5" },
    ];

    useEffect(() => {
        const fetch = async () => {
            try {
                const fetchedGenres = await fetchGenres(token);
                const formattedGenres = fetchedGenres.map((genre) => ({
                    label: genre,
                    value: genre.toLowerCase().replace(/\s+/g, "-"),
                }));
                setGenres(formattedGenres);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetch();
    }, [token]);

    const handleChange = (name, selectedOption) => {
        const updatedFilters = {
            ...filters,
            [name]: selectedOption ? selectedOption : "",
        };
        setFilters(updatedFilters);
        onFilter(updatedFilters);
    };

    const handleMultiChange = (name, selectedOptions) => {
        const updatedFilters = {
            ...filters,
            [name]: selectedOptions || [],
        };
        setFilters(updatedFilters);
        onFilter(updatedFilters);
    };

    return (
        <div className="filters-container">
            <div className="all-filters-container">
                <input
                    type="text"
                    name="searchTerm"
                    placeholder="Search by title or author..."
                    value={filters.searchTerm || ""}
                    onChange={(e) => {
                        const updatedFilters = {
                            ...filters,
                            searchTerm: e.target.value,
                        };
                        setFilters(updatedFilters);
                        onFilter(updatedFilters);
                    }}
                    className="search-bar"
                />
                <div>
                    <Select
                        name="genres"
                        isMulti
                        options={genres}
                        placeholder="Select one or more genres..."
                        className="filter-column filter-genre"
                        value={filters.genre}
                        onChange={(selectedOptions) => handleMultiChange("genre", selectedOptions)}
                    />
                </div>
                <Select
                    name="points"
                    options={pointsOptions}
                    placeholder="Select points"
                    className="filter-column"
                    value={pointsOptions.find((option) => option.value === filters.points)}
                    onChange={(selectedOption) => handleChange("points", selectedOption)}
                />
                <Select
                    name="stars"
                    options={starsOptions}
                    placeholder="Select stars"
                    className="filter-column"
                    value={starsOptions.find((option) => option.value === filters.stars)}
                    onChange={(selectedOption) => handleChange("stars", selectedOption)}
                />
                <div className="filter-column">
                    <label>From:</label>
                    <input
                        type="date"
                        name="dateFrom"
                        value={filters.dateFrom}
                        onChange={(e) => {
                            const updatedFilters = {
                                ...filters,
                                dateFrom: e.target.value,
                            };
                            setFilters(updatedFilters);
                            onFilter(updatedFilters);
                        }}
                        placeholder="Date from"
                    />
                </div>
                <div className="filter-column">
                    <label>To:</label>
                    <input
                        type="date"
                        name="dateTo"
                        value={filters.dateTo}
                        onChange={(e) => {
                            const updatedFilters = {
                                ...filters,
                                dateTo: e.target.value,
                            };
                            setFilters(updatedFilters);
                            onFilter(updatedFilters);
                        }}
                    />
                </div>
            </div>
            <div className="filter-row-sort">
                <label>Sort the books by:</label>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="sortOption"
                            value="title"
                            checked={filters.sortOption === "title"}
                            onChange={(e) => handleChange("sortOption", e.target.value)}
                        />
                        Title
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="sortOption"
                            value="author"
                            checked={filters.sortOption === "author"}
                            onChange={(e) => handleChange("sortOption", e.target.value)}
                        />
                        Author
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="sortOption"
                            value="points"
                            checked={filters.sortOption === "points"}
                            onChange={(e) => handleChange("sortOption", e.target.value)}
                        />
                        Points
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="sortOption"
                            value="stars"
                            checked={filters.sortOption === "stars"}
                            onChange={(e) => handleChange("sortOption", e.target.value)}
                        />
                        Stars
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="sortOption"
                            value="readDateAsc"
                            checked={filters.sortOption === "readDateAsc"}
                            onChange={(e) => handleChange("sortOption", e.target.value)}
                        />
                        Date Read - Ascending
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="sortOption"
                            value="readDateDesc"
                            checked={filters.sortOption === "readDateDesc"}
                            onChange={(e) => handleChange("sortOption", e.target.value)}
                        />
                        Date Read - Descending
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Filters;
