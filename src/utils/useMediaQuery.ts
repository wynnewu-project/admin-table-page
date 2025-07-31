import type { Breakpoint, BreakpointQuery } from "@/type/media";
import { ref } from "vue";

const useMediaQuery = () => {
	const breakpoint = ref<Breakpoint>("xl");
	const BREAKPOINT_QUERY: BreakpointQuery = {
		xs: "(max-width: 767px)",
		sm: "(min-width: 768px) and (max-width: 991px)",
		md: "(min-width: 992px) and (max-width: 1199px)",
		lg: "(min-width: 1200px) and (max-width: 1919px)",
		xl: "(min-width: 1920px)",
	};

	const setBreakpoint = (
		bp: Breakpoint,
		mql: MediaQueryList | MediaQueryListEvent,
	) => {
		if (mql.matches) {
			breakpoint.value = bp;
		}
	};

	const queryBreakpoint = (bp: Breakpoint) => {
		const mql = window.matchMedia(BREAKPOINT_QUERY[bp]);
		setBreakpoint(bp, mql);

		mql.addEventListener("change", (e) => {
			setBreakpoint(bp, e);
		});
	};

	Object.keys(BREAKPOINT_QUERY).forEach((bp) =>
		queryBreakpoint(bp as Breakpoint),
	);

	return {
		breakpoint,
	};
};

export default useMediaQuery;
