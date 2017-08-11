export default {
  format: 'umd',
  moduleName: 'current-time',
  external: [
    '@angular/core',
    '@angular/common',
	'@angular/platform-browser',
	'@angular/forms',
	'@angular/common/http'
  ],
  onwarn: ( warning ) => {
      const skip_codes = [
          'THIS_IS_UNDEFINED',
          'MISSING_GLOBAL_NAME'
      ];
      if ( skip_codes.indexOf(warning.code) != -1 ) return;
      console.error(warning);
  }
};