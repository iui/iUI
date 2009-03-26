//
//  HybridiUIAppDelegate.m
//  HybridiUI
//
//  Created by Sean Gilligan on 3/26/09.
//  Copyright __MyCompanyName__ 2009. All rights reserved.
//

#import "HybridiUIAppDelegate.h"

@implementation HybridiUIAppDelegate

@synthesize window;


- (void)applicationDidFinishLaunching:(UIApplication *)application {    
//	NSURL *url = [NSURL URLWithString:@"http://iui.googlecode.com/svn/tags/REL-current/samples/music.html"];
//	NSURLRequest *request = [NSURLRequest requestWithURL:url];
//	[webView loadRequest:request];

//	NSURL			*url		= [[NSURL fileURLWithPath:[thisBundle pathForResource:@"index" ofType:@"html" inDirectory:@"docroot"]] retain];
	NSURL *url = [NSURL URLWithString:@"http://iui.googlecode.com/svn/tags/REL-current/samples/music.html"];
	NSData			*htmlData	= [NSData dataWithContentsOfURL:url];
	
//	NSString *imagePath = [[NSBundle mainBundle] resourcePath];
	NSString *imagePath = [[NSBundle mainBundle] resourcePath];
	imagePath = [imagePath stringByAppendingString:@"/docroot"];
	NSLog(@"%@", imagePath);
	imagePath = [imagePath stringByReplacingOccurrencesOfString:@"/" withString:@"//"];
	imagePath = [imagePath stringByReplacingOccurrencesOfString:@" " withString:@"%20"];
	NSLog(@"%@", imagePath);
	NSURL *myBaseURL = [NSURL URLWithString: [NSString stringWithFormat:@"file:/%@//",imagePath]];
	
	

	[webView loadData:htmlData MIMEType:@"text/html" textEncodingName:@"UTF-8" baseURL:myBaseURL];

    [window makeKeyAndVisible];
}


- (void)dealloc {
    [window release];
    [super dealloc];
}


@end
