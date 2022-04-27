module.exports = {
  name: 'plugin-tester',
  exposes: {
    './Rest': './libs/rest/src/lib/rest.module.ts'
  },
  shared: (name, config) => {
    return {
      "@angular/core": {...config,singleton: true, strictVersion: true},
      "@angular/common": {...config,singleton: true, strictVersion: true},
      "@angular/common/http": {...config,singleton: true, strictVersion: true},
      "@angular/router": {...config,singleton: true, strictVersion: true},
      "@angular/forms": {...config,singleton: true, strictVersion: true},
      "@dontcode/core": {...config,singleton: true, strictVersion: true}
    }[name];
  }
};
