document.addEventListener("DOMContentLoaded", () => {
    // Populate the movie dropdown
    const populateMovieDropdown = async () => {
        const select = document.getElementById('movieSelect');
        if (!select) return;
        try {
            const response = await fetch('http://localhost:3001/movies');
            if (!response.ok) throw new Error('Failed to fetch movies');
            const movies = await response.json();
            select.innerHTML = '<option value="">Choose a movie...</option>';
            movies.forEach(movie => {
                const option = document.createElement('option');
                option.value = movie.movie_id;
                option.textContent = movie.title;
                select.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading movies:', error);
        }
    };

    // Function to display reviews
    const displayReviews = (reviews) => {
        const container = document.querySelector(".review-list");
        if (!container) return;
        container.innerHTML = "";
        reviews.forEach(review => {
            const reviewElement = document.createElement("div");
            reviewElement.className = "review-card";
            reviewElement.innerHTML = `
                <h3>${review.movie_title}</h3>
                <div class="review-info">
                    <p class="rating">Rating: ${review.rating}/10</p>
                    <p class="reviewer">Reviewer: ${review.reviewer_name || 'Anonymous'}</p>
                    <p class="date">Date: ${review.date_of_rating}</p>
                    <div class="review-text">${review.review_text ? review.review_text : ''}</div>
                </div>
                <div class="review-actions">
                    <button class="edit-btn" data-id="${review.review_id}">Edit</button>
                    <button class="delete-btn" data-id="${review.review_id}">Delete</button>
                </div>
            `;
            container.appendChild(reviewElement);
        });
        // Add event listeners for edit and delete buttons
        container.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const reviewId = btn.getAttribute('data-id');
                startEditReview(reviewId);
            });
        });
        container.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const reviewId = btn.getAttribute('data-id');
                await deleteReview(reviewId);
                loadReviews();
            });
        });
    };

    // Function to create a new review
    const createReview = async (reviewData) => {
        try {
            const response = await fetch('http://localhost:3001/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData)
            });
            if (!response.ok) {
                throw new Error('Failed to create review');
            }
            const result = await response.json();
            alert('Review created successfully!');
            loadReviews();
            return result;
        } catch (error) {
            console.error('Error creating review:', error);
            alert('Error creating review: ' + error.message);
        }
    };

    // Function to update a review
    const updateReview = async (reviewId, reviewData) => {
        try {
            const response = await fetch(`http://localhost:3001/reviews/${reviewId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData)
            });
            if (!response.ok) {
                throw new Error('Failed to update review');
            }
            const result = await response.json();
            alert('Review updated successfully!');
            loadReviews();
            return result;
        } catch (error) {
            console.error('Error updating review:', error);
            alert('Error updating review: ' + error.message);
        }
    };

    // Function to delete a review
    const deleteReview = async (reviewId) => {
        if (!confirm('Are you sure you want to delete this review?')) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:3001/reviews/${reviewId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete review');
            }
            const result = await response.json();
            alert('Review deleted successfully!');
            return result;
        } catch (error) {
            console.error('Error deleting review:', error);
            alert('Error deleting review: ' + error.message);
        }
    };

    // Edit review logic
    let editingReviewId = null;
    const addReviewForm = document.getElementById('addReviewForm');
    if (addReviewForm) {
        addReviewForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(addReviewForm);
            const reviewData = {
                movie_id: formData.get('movieSelect'),
                rating: parseFloat(formData.get('rating')),
                reviewer_name: formData.get('reviewer_name'),
                review_text: formData.get('review_text')
            };
            if (editingReviewId) {
                await updateReview(editingReviewId, reviewData);
                editingReviewId = null;
                addReviewForm.querySelector('button[type="submit"]').textContent = 'Submit Review';
            } else {
                await createReview(reviewData);
            }
            addReviewForm.reset();
        });
    }

    // Start editing a review
    const startEditReview = async (reviewId) => {
        try {
            const response = await fetch('http://localhost:3001/reviews');
            if (!response.ok) throw new Error('Failed to fetch reviews');
            const reviews = await response.json();
            const review = reviews.find(r => r.review_id == reviewId);
            if (!review) return;
            document.getElementById('movieSelect').value = review.movie_id;
            document.getElementById('rating').value = review.rating;
            document.getElementById('reviewer_name').value = review.reviewer_name;
            document.getElementById('review_text').value = review.review_text || '';
            editingReviewId = reviewId;
            addReviewForm.querySelector('button[type="submit"]').textContent = 'Update Review';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error('Error loading review for edit:', error);
        }
    };

    // Load reviews on page load
    const loadReviews = async () => {
        try {
            const response = await fetch('http://localhost:3001/reviews');
            if (!response.ok) {
                throw new Error('Failed to load reviews');
            }
            const reviews = await response.json();
            displayReviews(reviews);
        } catch (error) {
            console.error('Error loading reviews:', error);
            alert('Error loading reviews: ' + error.message);
        }
    };

    // Load reviews and movies when the page loads
    populateMovieDropdown();
    loadReviews();
}); 