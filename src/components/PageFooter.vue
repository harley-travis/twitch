<template>
    <div class="footer container-fluid">
        <div class="container">
            <div class="row">
                <div class="left-foot col-sm">
                    Built by <a href="https://www.twitch.tv/lordbigoftasty" target="_blank">LordBigofTasty</a>
                </div>
                <div class="col-sm">
                    &copy; {{this.year}} ZeroStream.Club | All Rights Reserved. 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'BrowseStreamers',
        data: function() {
            return {
                year: ''
            }
        },
        created() {
            this.getYear()
        },
        methods: {
            getYear() {
                var d = new Date();
                var n = d.getFullYear();
                this.year = n;
                return n;
            }
        }
    }
</script>

<style>
.footer {
    padding: 15px;
    border-top: solid 1px #eee;
    margin-top: 35px;
    text-align: right;
}
.left-foot {
    text-align: left;
}
</style>