Vue.component ('products', {
    props: {
        premium: {
            type: Boolean,
            required: true
        },
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <div class="product">
            <div class="product-image">
                <img :src="image">
            </div>

            <div class="product-info">
                <h1>{{ title }}</h1>
                <h3>{{ description }}</h3>
                <p v-if="inStock">In Stock</p>
                <p :class="{ lineThrough: !inStock }" v-else>Out of Stock!</p>
                <p>Shipping: {{ shipping }}</p>
                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>

                <div v-for="(variant, index) in variants" :key="variant.variantId" class="color-box" :style="{ backgroundColor: variant.variantColor }" @mouseover="updateProduct(index)">
                </div>

                <p>Sizes Available:</p>
                <ul class="sizes">
                    <li v-for="size in sizes">{{ size }} </li>
                </ul>

                <div class="buttons">
                    <button @click="addToCart" :disabled="!inStock"
                    :class="{ disabledButton: !inStock }">Add to Cart</button>
                    <button @click="deductFromCart" :style="{ backgroundColor: 'red'}">Remove from Cart</button>
                </div>

            </div>
            
            <div>
                <h2>Reviews</h2>
                <p v-if="!reviews.length">There are no reviews yet.</p>
                <ul>
                    <li v-for="review in reviews">
                        <p>{{ review.name }}</p>
                        <p>{{ review.rating }}</p>
                        <p>{{ review.review }}</p>
                    </li>
                </ul>
            </div>

        <product-review @review-submitted="addReview"></product-review>

        </div>
    `,
    data() {
        return {
            brand: 'Zuwee',
            product: 'Socks',
            description: 'This is a designers luxury socks for the winter weather.',
            selectedVariant: 0,
            variants: [
                {
                    variantId: 2224,
                    variantColor: "green",
                    variantImage: "assets/images/greensocks.jpg",
                    variantQuantity: 10
                },
                {
                    variantId: 2225,
                    variantColor: "blue",
                    variantImage: "assets/images/bluesocks.jpg",
                    variantQuantity: 1
                }
            ],
            sizes: ["38", "39", "40", "42", "44"],
            reviews: []
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        deductFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct(index) {
            this.selectedVariant = index;
        },
        addReview(productReview) {
            this.reviews.push(productReview)
        }
    },

    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            else {
                return 2.99
            }
        }
    },
})

Vue.component('product-review', {
    template: `
        <form class="review-form" @submit.prevent="onSubmit">
        
            <p v-if="errors.length">
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </p>
            
            <p>
                <label for="name">Name:</label>
                <input id="name" v-model="name">
            </p>
            <p>
                <label for="review">Review:</label>
                <textarea id="review" v-model="review"></textarea>
            </p>
            <p>
                <label for="rating">Rating:</label>
                <select id="rating" v-model.number="rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>
            
            <p>
                <input type="submit" value="submit">
            </p>
        </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            question: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.rating && this.review && this.question) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                };
                this.$emit('review-submitted', productReview);
                this.name = null;
                this.review = null;
                this.rating = null;
            }
            else {
                if (!this.name) this.errors.push("Name is required");
                if (!this.review) this.errors.push("Review is required");
                if (!this.rating) this.errors.push("Rating is required");
                if (!this.question) this.errors.push("Please respond to question");
            }
        }
    }

})

let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        details: ["20% Polyester", "80% Cotton", "Gender-Neutral"],
        cart: [],
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        deductCart(id) {
                this.cart.pop(id);
        },
    }
});