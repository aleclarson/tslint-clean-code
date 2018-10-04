import { TestHelper } from './TestHelper';
import { FAILURE_MIN_STRING } from '../idLengthRule';

/**
 * Unit tests.
 */
describe('idLengthRule', (): void => {
    const ruleName: string = 'id-length';

    describe('default options', () => {
        it('should pass on identifiers with length 2', (): void => {
            const script: string = `
                let x1;
                const y1;
                function f1() {}
                class c1() {}
            `;
            TestHelper.assertViolations(ruleName, script, []);
        });

        it('should fail on identifiers with length 1', (): void => {
            const script: string = `
                let x;
                const y;
                function f() {}
                class c() {}
            `;
            TestHelper.assertViolations(ruleName, script, [
                {
                    failure: FAILURE_MIN_STRING + ': x',
                    name: 'file.ts',
                    ruleName: 'id-length',
                    ruleSeverity: 'ERROR',
                    startPosition: {
                        character: 21,
                        line: 2,
                    },
                },
                {
                    failure: FAILURE_MIN_STRING + ': y',
                    name: 'file.ts',
                    ruleName: 'id-length',
                    ruleSeverity: 'ERROR',
                    startPosition: {
                        character: 23,
                        line: 3,
                    },
                },
                {
                    failure: FAILURE_MIN_STRING + ': f',
                    name: 'file.ts',
                    ruleName: 'id-length',
                    ruleSeverity: 'ERROR',
                    startPosition: {
                        character: 26,
                        line: 4,
                    },
                },
                {
                    failure: FAILURE_MIN_STRING + ': c',
                    name: 'file.ts',
                    ruleName: 'id-length',
                    ruleSeverity: 'ERROR',
                    startPosition: {
                        character: 23,
                        line: 5,
                    },
                },
            ]);
        });
    });

    describe('change options', () => {
        let options: any[];
        beforeEach((): void => {
            options = [true];
        });

        describe('object option', () => {
            describe('exceptions', () => {
                beforeEach((): void => {
                    options = [
                        true,
                        {
                            exceptions: ['x', 'y', 'f', 'c'],
                        },
                    ];
                });

                it('should pass on identifiers of length 1 and are exceptions', (): void => {
                    const script: string = `
                    let x;
                    const y;
                    function f() {}
                    class c() {}
                    `;
                    TestHelper.assertViolationsWithOptions(ruleName, options, script, []);
                });
            });

            describe('min = 0', () => {
                beforeEach((): void => {
                    options = [
                        true,
                        {
                            min: 0,
                        },
                    ];
                });

                it('should pass on identifiers of length 1', (): void => {
                    const script: string = `
                                    let x;
                                    const y;
                                    function f() {}
                                    class c() {}
                                    `;
                    TestHelper.assertViolationsWithOptions(ruleName, options, script, []);
                });
            });
        });

        describe('array option (exception)', () => {
            beforeEach((): void => {
                options = [true, ['x', 'y', 'f', 'c']];
            });

            it('should pass on identifiers of length 1 and are exceptions', (): void => {
                const script: string = `
                                let x;
                                const y;
                                function f() {}
                                class c() {}
                                `;
                TestHelper.assertViolationsWithOptions(ruleName, options, script, []);
            });
        });

        describe('number option (minimum)', () => {
            describe('option = 0', () => {
                beforeEach((): void => {
                    options = [true, 0];
                });

                it('should pass on identifiers of length 1', (): void => {
                    const script: string = `
                    let x;
                    const y;
                    function f() {}
                    class c() {}
                    `;
                    TestHelper.assertViolationsWithOptions(ruleName, options, script, []);
                });
            });
        });
    });
});
