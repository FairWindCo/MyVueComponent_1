const SteelSeriesControl = {
  props: {
    title: {
      type: String,
      default: ''
    }
    ,
    value: {
      type: Number,
      default:
        0
    }
    ,
    minimal_alarm_value: {
      type: Number,
      default: null
    }
    ,
    maximal_alarm_value: {
      type: Number,
      default:
        null
    }
    ,
    minimal_warning_value: {
      type: Number,
      default:
        null
    }
    ,
    maximal_warning_value: {
      type: Number,
      default:
        null
    }
    ,
    min_value: {
      type: Number,
      default:
        0
    }
    ,
    max_value: {
      type: Number,
      default:
        100
    }
    ,
    minimal_alarm_color: {
      type: String,
      default:
        'rgb(103,9,129)'
    }
    ,
    maximal_alarm_color: {
      type: String,
      default:
        'rgb(126,3,27)'

    }
    ,
    minimal_warning_color: {
      type: String,
      default: 'rgb(82,56,153)'

    }
    ,
    maximal_warning_color: {
      type: String,
      default: 'rgb(221,135,8)'

    },
    normal_zone_color: {
      type: String,
      default: 'rgb(13,138,19)'

    },
    show_normal_zone: {
      type: Boolean,
      default: 'true'
    },

    size: undefined
  }
  ,
  methods: {
    random: () => {
      this.internal_value += 1;
    }
  }
  ,
  data() {
    return {
      count: 0,
      radial_component: null,
      internal_value: this.value
    }
  }
  ,
  computed: {
    value_ex: {
      get() {
        return this.internal_value;
      }
      ,
      set(newValue) {
        this.internal_value = newValue;
        this.radial_component.setValue(newValue);
      }
    }
    ,

    form_steelseries() {
      const sections = [];
      if (this.minimal_alarm_value !== undefined && this.minimal_alarm_value !== null) {
        sections.push(steelseries.Section(this.min_value, this.minimal_alarm_value, this.minimal_alarm_color))
      }
      if (this.minimal_warning_value !== undefined && this.minimal_warning_value !== null) {
        const min = (this.minimal_alarm_value !== undefined && this.minimal_alarm_value !== null) ? this.minimal_alarm_value : this.min_value
        sections.push(steelseries.Section(min, this.minimal_warning_value, this.minimal_warning_color))
      }
      if (this.maximal_warning_value !== undefined && this.maximal_warning_value !== null) {
        const max = (this.maximal_alarm_value !== undefined && this.maximal_alarm_value !== null) ? this.maximal_alarm_value : this.max_value
        sections.push(steelseries.Section(this.maximal_warning_value, max, this.maximal_warning_color))
      }
      if (this.maximal_alarm_value !== undefined && this.maximal_alarm_value !== null) {
        sections.push(steelseries.Section(this.maximal_alarm_value, this.max_value, this.maximal_alarm_color))
      }
      if (this.show_normal_zone) {
        const min = (this.minimal_alarm_value !== undefined && this.minimal_alarm_value !== null) ? this.minimal_alarm_value : this.min_value
        const max = (this.maximal_alarm_value !== undefined && this.maximal_alarm_value !== null) ? this.maximal_alarm_value : this.max_value
        sections.push(steelseries.Section(min, max, this.normal_zone_color))
      }
      console.log(sections)
      return sections
    }
  }
  ,
  watch: {
    value(newValue) {
      //this.value = newValue; <- Так делать нельзя
      this.radial_component.setValue(this.value);

    }
  }
  ,
  template: `<canvas ref="canvas">No canvas in your browser...sorry...</canvas>`,

  mounted() {
    //Метод вызывается когда компонент монтируется
    console.log('CREATE NEW COMPONENT');

    const configuration = {
      titleString: this.title,
      section: this.form_steelseries
    }
    if (this.size !== undefined && this.size !== null) {
      configuration['size'] = this.size
    }


    this.radial_component = new steelseries.Radial(this.$refs.canvas, configuration);

    this.radial_component.setValue(this.value);
  }
}

export default SteelSeriesControl;
