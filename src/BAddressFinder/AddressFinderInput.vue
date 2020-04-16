<template>
    <div class="">
        <li class="gfield col-xs-12 col-sm-6" id="guide_enter_address">
            <div class="ginput_container">
                <label class="gfield_label" for="address_line_1" id="address_line_1_label">Address line 1</label>
                <input type="text" id="address_line_1" placeholder="" autocomplete="off" v-model="address.address_line_1">
            </div>
        </li>
        <li class="gfield col-xs-12 col-sm-6">
            <div class="ginput_container">
                <label class="gfield_label" for="address_line_2" id="address_line_2_label">Address line 2</label>
                <input type="text" id="address_line_2" placeholder="" v-model="address.address_line_2">
            </div>
        </li>
        <li class="gfield col-xs-12 col-sm-6">
            <div class="ginput_container">
                <label class="gfield_label" for="locality_name" id="suburb_label">Suburb</label>
                <input type="text" id="locality_name" placeholder="" v-model="address.locality_name">
            </div>
        </li>
        <li>
            <div class="gfield col-xs-12 col-sm-6">
                <div class="ginput_container">
                    <label class="gfield_label" for="state_territory" id="city_label">State</label>
                    <input type="text" id="state_territory" placeholder="" v-model="address.state_territory">
                </div>
            </div>
        </li>
        <li>
            <div class="gfield col-xs-12 col-sm-6">
                <div class="ginput_container">
                    <label class="gfield_label" for="postcode" id="postcode_label">Postcode</label>
                    <input type="text" id="postcode" placeholder="" v-model="address.postcode">
                </div>
            </div>
        </li>
    </div>
</template>

<script>
    import addressFinder from './utils/addressfinder'
    import bus from './utils/eventbus'

    export default {
        name: 'Bolt-Addressfinder',

        data () {
            return {
                ready: false,
                address: {
                  address_line_1: '',
                  address_line_2: '',
                  locality_name: '',
                  state_territory: '',
                  postcode: ''
                }
            }
        },

        props: {
            addressData: Object
        },

        watch: {
            addressData: {
                immediate: true,
                handler (val) {
                    this.address = val
                }
            }
        },

        mounted () {
            addressFinder.initialise()
            bus.$on('afloaded', this.init)
            if (addressFinder.ready) {
                this.init()
            }
            this.$emit('update:addressData', this.address)
        },

        methods: {
            init () {
                let self = this

                if (this.ready) {
                    return
                }
                this.ready = true
                let widget = new window.AddressFinder.Widget(
                    document.getElementById('address_line_1'),
                    'JXYDN9BLCRM78FQU6VA3',
                    'AU', {
                        'address_params': {
                            'paf': '1',
                            'post_box': '0'
                        },
                        'show_locations': true,
                        'location_params': {
                            'location_types': 'street, locality, state'
                        }
                    }
                )
                widget.on('result:select', function (fullAddress, metaData) {
                    self.address.address_line_1 = metaData.address_line_1 || metaData.street || ''
                    self.address.address_line_2 = metaData.address_line_2 || ''
                    self.address.locality_name = metaData.locality_name || ''
                    self.address.state_territory = metaData.state_territory || ''
                    self.address.postcode = metaData.postcode || ''
                })
            }
        }
    }
</script>
