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