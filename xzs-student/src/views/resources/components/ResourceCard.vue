<template>
    <div class="el-card is-always-shadow"><!---->
      <div class="el-card__body" style="padding: 0px;">
        <div style="padding: 24px;">
          <span style="font-weight: bold;">{{name}}</span><br><br>
          <span>{{description}}</span><br><br>
          <div class="bottom clearfix">
            <a :href="url" class="" target="_blank">
              <button type="button" class="el-button el-button--warning el-button--medium "><!----><!---->
                <span>Download</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ResourceCard',
  props: {
    name: {
      type: String,
      default: ' '
    },
    description: {
      type: String,
      default: ' '
    },
    url: {
      type: String,
      default: ' '
    }

  },
  methods: {
  }
}
</script>
